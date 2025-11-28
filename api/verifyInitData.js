export default async function handler(req, res) {
  const BOT_TOKEN = process.env.BOT_TOKEN;
  if (!BOT_TOKEN) {
    return res.status(400).json({ ok:false, message:"Missing BOT_TOKEN env" });
  }
  res.status(200).json({
    ok: true,
    note: "服务器已配置 BOT_TOKEN",
    serverTime: new Date().toISOString()
  });
}
