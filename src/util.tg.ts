import { InlineQueryResult } from './types'
import fetch from 'node-fetch'

const BOT_KEY = process.env.TELEGRAM_BOT_KEY

export async function tgSendMessage(chat_id: number, text: string, rep = 0) {
  const result = await fetch(
    `https://api.telegram.org/bot${BOT_KEY}/sendMessage`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        chat_id,
        text,
        reply_to_message_id: rep === 0 ? undefined : rep,
        parse_mode: 'HTML',
      }),
    }
  )
  console.log(result)
  return result
}

export async function tgSendVoice(
  chat_id: number,
  caption: string,
  voice: string,
  rep = 0
) {
  const result = await fetch(
    `https://api.telegram.org/bot${BOT_KEY}/sendVoice`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        chat_id,
        caption,
        voice,
        reply_to_message_id: rep === 0 ? undefined : rep,
        parse_mode: 'HTML',
      }),
    }
  )
  console.log(result)
  return result
}

export async function answerInlineQuery(
  id: string,
  results: InlineQueryResult[],
  cache_time = 0
) {
  const result = await fetch(
    `https://api.telegram.org/bot${BOT_KEY}/answerInlineQuery`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        inline_query_id: id,
        results: results,
        cache_time,
      }),
    }
  )
  console.log(result)
  return result
}
