import { tgSendMessage } from './util.tg'

import base64url from 'base64url'

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL

function getUserFullName(user: any) {
  let ret = `${user.first_name}`
  if (user.last_name) ret += ` ${user.last_name}`
  if (user.username) ret += ` (@${user.username})`
  return ret
}

async function reportVTuber(text: string, uid: number, uname: string) {
  // Here we used Slack
  if (!SLACK_WEBHOOK_URL) {
    console.warn('No Slack webhook URL provided!')
    return
  }
  await fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      text: `Reported VTuber: ${text}\nReporter: ${uname} (id: ${uid})`,
    }),
  })
}

export default async function act(body: any) {
  const message = body?.message?.text
  if (!message) return
  const start = message.replace(/\/start(@[a-zA-z0-9-]*)? */, '')
  const data = base64url.decode(start)
  const split = data.split('|')
  if (split.length < 2) return
  const opr = split[0]
  const target = split.slice(1).join('|')
  switch (opr) {
    case 'R': {
      await reportVTuber(
        target,
        body.message.from.id,
        getUserFullName(body.message.from)
      )
      await tgSendMessage(
        body.message.chat.id,
        `[报告毕业 VTuber] 「${target}」已经提交。感谢您的贡献。`,
        body.message.message_id
      )
    }
  }
}
