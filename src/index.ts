import express from "express";
import DiceList from "./listDefinitions";
import { ConsumeTarget } from "./types";
import { consumeInlineResults, consumeMessageResult } from "./consumer";
import { Request, Response } from "express";

import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
declare global {
  namespace NodeJS {
    interface Global {
      __rootdir__: string;
    }
  }
}
global.__rootdir__ = __dirname || process.cwd();

process.env.SENTRY_DSN && Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new RewriteFrames({
    root: global.__rootdir__
  })]
});

export const app = express();
app.use(express.json());
// @ts-ignore
app.post("/botd027b3d59c15", (req: Request, res: Response) => {
  let result: ConsumeTarget[] = [];
  for (const i of DiceList) {
    const ret = i.procedures.act(req);
    if (!ret.ok) {
      res.send({
        ok: false,
        reason: ret
      })
      return;
    }
    if (typeof ret !== "number") {
      result.push({
        result: ret,
        title: i.title,
        text: i.getText(ret),
      });
    }
  }
  if (result.length !== 0) {
    if (result[0].result.env.isInline) {
      // Inline Mode
      consumeInlineResults(result);
    } else {
      // Command Mode, only return the 1st result
      consumeMessageResult(result[0]);
    }
  }
  res.send({
    ok: true
  });
});

export function run(port: number = Number(process.env.PORT) || 3000) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}