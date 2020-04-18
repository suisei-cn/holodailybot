module.exports = {
  apps: [{
    name: 'Holodaily Bot',
    script: 'dist/index.js',
    autorestart: true,
    watch: false,
    max_memory_restart: '100M',
    env: {
      PORT: 3000,
      TELEGRAM_BOT_KEY: ""
    }
  }]
};
