import i18nsource from './i18n'

export function getHumanReadableDate(date: Date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

const regEx = /^\/([a-z-_]+)(@[a-z0-9-_]+)? ?/i
const DEFAULT_LANG = 'zh'

export function extractQuery(body: any): string[] | undefined {
  if (body.message) {
    const msg = body.message.text || ''
    const lowerQuery: string = msg.toLowerCase()
    const match = lowerQuery.match(regEx)
    if (match === null) return
    return [lowerQuery.replace(regEx, ''), match[1] || '']
  } else if (body.inline_query) {
    return [body.inline_query.query || '', '']
  }
  return
}

export function extractCommand(query: string): string {
  const match = query.match(regEx)
  if (match === null || match.length < 2) return ''
  return match[1]
}

function getLangFromUser(user: any): string {
  const lc = user?.language_code || DEFAULT_LANG
  return lc.split('-')[0].trim()
}

export function getLang(body: any): string {
  if (body.message) {
    return getLangFromUser(body.message?.from || {})
  } else if (body.inline_query) {
    return getLangFromUser(body.inline_query?.from || {})
  }
  return DEFAULT_LANG
}

export function translate(
  text: string,
  lang: string,
  obj: Record<string, string>
): string {
  let ret = i18nsource?.[lang]?.[text] || text
  for (const [key, value] of Object.entries(obj)) {
    ret = ret.replaceAll(`%${key}`, value)
  }
  return ret
}
