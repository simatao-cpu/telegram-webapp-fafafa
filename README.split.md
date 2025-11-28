拆分说明：
- frontend/: 前端静态文件 (index.html, assets, js)
- backend/: 后端 Node.js + Express 服务（含 /api/verify）
运行后端:
  cd backend
  npm install
  export TELEGRAM_BOT_TOKEN="你的BotToken"  # Windows Git Bash 用: export
  npm run dev
