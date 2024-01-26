The Holodailybot project is going to **sunset** on Feb 15, 2024.

Anyone interested may still be able to selfhost the bot.

----

# Holodailybot

Unofficial Hololive-style gacha bot on Telegram. Revised. Not limited to VTubers of Hololive.

[![](https://img.shields.io/badge/Telegram-%40holodailybot-blue.svg)](https://t.me/holodailybot)

## Usage

```sh
export PORT=3000
export TELEGRAM_BOT_KEY=BOT_KEY
# export SLACK_WEBHOOK_URL=SLACK_WEBHOOK_URL # if you want to use the reporting feature
npm install
npm run build
npm run run
```

Also, we have a `ecosystem.config.js` for [`pm2`](https://pm2.io) users.

## Contribute

You can add VTubers to the following list. Note that some lists have their rules.

- [`vtuberInfo.hololive.ts`](https://github.com/suisei-cn/holodailybot/blob/goshujin-sama/src/lists/vtuberInfo.hololive.ts): Hololive & INNK only.
- [`vtuberInfo.hololike.ts`](https://github.com/suisei-cn/holodailybot/blob/goshujin-sama/src/lists/vtuberInfo.hololike.ts): VTubers who have close relationship with at least one VTuber on the `vtuberInfo.hololive.ts` list.
- [`vtuberInfo.more.ts`](https://github.com/suisei-cn/holodailybot/blob/goshujin-sama/src/lists/vtuberInfo.more.ts): Any VTuber not included by the first two lists.

The list for `vtuberInfo.more.ts` will be updated at 23:25 every Thursday (CST) using the source of [VDB](https://github.com/dd-center/vdb). To be eligible for this list, an entry should:
* Have not graduated
* Fulfill at least 1 of the following:
  * Have an official account on any platform other than Bilibili
  * Have an official account on YouTube

If you notice any VTuber given by `@holodailybot` that is not active anymore, you can click the report link, or send a pull request to add his/her/its name to [`utils/exclude.info.json`](https://github.com/suisei-cn/holodailybot/blob/goshujin-sama/utils/exclude.info.json).

## Golden Fingers

The demo instance of @holodailybot on Telegram includes a special undisclosed middleware which contains some golden fingers. Try interacting with the bot and dig surprises!

## License

MIT
