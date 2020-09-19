import { tgSendMessage } from './util.tg'

import base64url from 'base64url'

export default function act(body: any) {
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
      tgSendMessage(
        body.message.chat.id,
        `[报告毕业 VTuber] 「${target}」已经提交。`,
        body.message.message_id
      )
    }
  }
}
