import fetch from 'node-fetch'
import { writeFileSync } from 'fs'

const list_url = 'https://vdb.vtbs.moe/json/list.json'
const excludeList = require('./exclude.info.json')
const nameMap = require('./namemap.info.json')

interface Vtuber {
  uuid: string
  type: 'vtuber' | 'group' | 'fan' | string
  bot: boolean
  accounts: {
    id: string
    type: string
    platform: string
  }[]
  name: Record<string, string>
}

async function main() {
  const origin = await fetch(list_url).then((x) => x.json())
  const linkSyntax = origin.meta.linkSyntax
  const source: Vtuber[] = origin.vtbs
  const data = source
    .filter((x) => x.type === 'vtuber')
    .filter(
      (x) =>
        x.accounts.filter((y) => y.platform !== 'bilibili').length > 1 ||
        x.accounts.filter((y) => y.platform === 'youtube').length
    )
  const exp: { [name: string]: any } = {}
  const info: { [name: string]: Record<string, string> } = {}
  for (const k of data) {
    let name = k.name.cn || k.name[k.name.default]
    if (nameMap[name]) name = nameMap[name]
    if (excludeList.includes(name)) continue
    for (const [lang, val] of Object.entries(k.name)) {
      if (lang === 'default') continue
      if (lang === 'extra') continue
      try {
        if (val.trim() !== val) {
          console.info(`${name}'s ${lang} name is not good.`)
        }
      } catch (e) {
        console.log(k.name)
        throw e
      }
    }
    exp[name] = {}
    const personInfo: any = {}
    for (const acct of k.accounts) {
      // switch (acct.platform) {
      personInfo[acct.platform] = linkSyntax[acct.platform].replace(
        '{id}',
        acct.id
      )
      // }
    }
    info[name] = personInfo
  }
  console.log('len=', Object.keys(exp).length)
  writeFileSync('src/lists/extras.info.json', JSON.stringify(info, null, 2))
}

main()
