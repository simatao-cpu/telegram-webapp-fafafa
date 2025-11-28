import crypto from 'crypto';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });

  const { initData } = req.body || {};
  if (!initData) return res.status(400).json({ error: "Missing initData" });

  const botToken = process.env.BOT_TOKEN;
  if (!botToken) return res.status(500).json({ error: "Server missing BOT_TOKEN" });

  try {
    const paramsArr = initData.split("&").map(x => x.split("="));
    const params = Object.fromEntries(paramsArr.map(([k, v]) => [k, decodeURIComponent(v)]));

    const hash = params.hash;
    delete params.hash;

    const dataCheckString = Object.keys(params)
      .sort()
      .map(k => `${k}=${params[k]}`)
      .join("\n");

    const secretKey = crypto.createHash('sha256').update(botToken).digest();
    const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest("hex");

    res.json({ ok: hmac === hash, hash, computed: hmac });
  } catch (err) {
    res.status(500).json({ error: "Internal error", detail: err.message });
  }
}
