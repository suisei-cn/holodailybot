import express from 'express'
import DiceList from './listDefinitions'
import { ConsumeTarget } from './types'
import { consumeInlineResults, consumeMessageResult } from './consumer'
import { Request, Response } from 'express'
import handleSpecialCommands from './specials'

import * as Sentry from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'
declare global {
  namespace NodeJS {
    interface Global {
      __rootdir__: string
    }
  }
}
global.__rootdir__ = __dirname || process.cwd()

process.env.SENTRY_DSN &&
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new RewriteFrames({
        root: global.__rootdir__,
      }),
    ],
  })

export const app = express()
app.use(express.json())
// @ts-ignore
app.post('/botd027b3d59c15', (req: Request, res: Response) => {
  const result: ConsumeTarget[] = []
  if ((req.body?.message?.text as string)?.startsWith('/start')) {
    handleSpecialCommands(req.body)
    res.send({
      ok: true,
    })
    return
  }
  if (!isResponsive(req.body?.message?.text)) {
    res.send({
      ok: true,
    })
    return
  }
  for (const i of DiceList) {
    const ret = i.procedures.act(req)
    if (!ret.ok) {
      res.send({
        ok: false,
        reason: ret,
      })
      return
    }
    if (typeof ret !== 'number') {
      result.push({
        result: ret,
        title: i.title,
        text: i.getText(ret),
        dicer: i,
      })
    }
  }
  if (result.length !== 0) {
    if (result[0].result.env.isInline) {
      // Inline Mode
      consumeInlineResults(result)
    } else {
      const targetResult = result.filter(
        (x) => x.result.env.command == x.dicer.command.toLowerCase()
      )
      if (targetResult.length > 0) {
        consumeMessageResult(targetResult[0])
      } else {
        consumeMessageResult(result[0])
      }
    }
  }
  res.send({
    ok: true,
  })
})

export function run(port: number = Number(process.env.PORT) || 3000) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}

function isResponsive(cmd: string) {
  const commands = DiceList.filter((x) => x.command)
  for (const i of commands) {
    if (cmd.startsWith('/' + i)) return true
  }
  return false
}
