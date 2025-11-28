// backend/server.js
const express = require('express');
const app = express();
const verifyRouter = require('./routes/verify');

app.use(express.json());
app.get('/', (req, res) => res.send('Backend running'));
app.use('/api', verifyRouter);

// Render 和大多数 host 通过 process.env.PORT 提供端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
bot.command("start", (ctx) => {
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
