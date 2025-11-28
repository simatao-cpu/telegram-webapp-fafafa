export default async function handler(req, res) {
  try {
    const BOT_TOKEN = process.env.BOT_TOKEN;

    if (!BOT_TOKEN) {
      return res.status(400).json({
        ok: false,
        message: "Missing BOT_TOKEN env"
      });
    }

    return res.status(200).json({
      ok: true,
      message: "BOT_TOKEN 已生效",
      serverTime: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}
