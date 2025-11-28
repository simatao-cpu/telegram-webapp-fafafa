const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);

// 启动命令
bot.start((ctx) => {
  ctx.reply("欢迎进入 WebApp ↓", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "打开 WebApp",
            web_app: { url: "https://telegram-webapp-fafafa.onrender.com" }
          }
        ]
      ],
      resize_keyboard: true
    }
  });
});

bot.launch();
console.log("Bot is running...");
