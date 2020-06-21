# Holodailybot

Unofficial Hololive-style gacha bot on Telegram. Revised. Not limited to VTubers of Hololive.

[![](https://img.shields.io/badge/Telegram-%40holodailybot-blue.svg)](https://t.me/holodailybot)

## Usage

```
export PORT=3000
export TELEGRAM_BOT_KEY=BOT_KEY
npm install
npm run build
npm run run
```

Also, we have a `ecosystem.config.js` for [`pm2`](https://pm2.io) users.

## Contribute

You can add VTubers to the following list. Note that some lists have their rules.

- [`vtuberInfo.hololive.ts`](https://github.com/suisei-cn/holodailybot/blob/master/src/lists/vtuberInfo.hololive.ts): Hololive & INNK only.
- [`vtuberInfo.hololike.ts`](https://github.com/suisei-cn/holodailybot/blob/master/src/lists/vtuberInfo.hololike.ts): VTubers who have close relationship with at least one VTuber on the `vtuberInfo.hololive.ts` list.
- [`vtuberInfo.more.ts`](https://github.com/suisei-cn/holodailybot/blob/master/src/lists/vtuberInfo.more.ts): Any VTuber not included by the first two lists.

## Golden Fingers

The demo instance of @holodailybot on Telegram includes a special undisclosed middleware which contains some golden fingers. Try interacting with the bot and dig surprises!

## License

MIT
