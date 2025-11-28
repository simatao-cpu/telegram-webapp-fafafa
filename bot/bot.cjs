// bot/bot.cjs
const { Telegraf } = require('telegraf');

const token = process.env.TELEGRAM_BOT_TOKEN || process.env.BOT_TOKEN;
if (!token) {
  console.error('Missing TELEGRAM_BOT_TOKEN in env');
  process.exit(1);
}

const bot = new Telegraf(token);

bot.start((ctx) => {
  ctx.reply('欢迎进入 WebApp ↓', {
    reply_markup: {
      keyboard: [
        [
          {
            text: '打开 WebApp',
            web_app: { url: 'https://telegram-webapp-fafafa-1.onrender.com' } // <-- 确认这里用你实际前端域名
          }
        ]
      ],
      resize_keyboard: true
    }
  });
});

bot.launch()
  .then(() => console.log('Bot is running (polling)...'))
  .catch(err => {
    console.error('Bot failed to start:', err);
    process.exit(1);
  });

// 优雅退出
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
