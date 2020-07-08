module.exports = {
  apps: [
    {
      name: 'Holodaily Bot',
      script: 'dist/cli.js',
      autorestart: true,
      watch: false,
      max_memory_restart: '100M',
      env: {
        PORT: 3000,
        TELEGRAM_BOT_KEY: '',
        // If it's set, at the first gacha of every day, the gacha statistics for the last day
        //   will be sent to this Telegram chat.
        TELEGRAM_ADMINCHAT_ID: -1,
        // DSN used by Sentry
        // SENTRY_DSN: ""
      },
    },
  ],
}
