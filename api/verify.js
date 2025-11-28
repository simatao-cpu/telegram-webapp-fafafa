import crypto from "crypto";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { initData } = req.body || {};
  if (!initData) return res.status(400).json({ error: "Missing initData" });

  const botToken = process.env.BOT_TOKEN;
  if (!botToken) return res.status(500).json({ error: "Missing BOT_TOKEN env" });

  try {
    const secret = crypto.createHash("sha256").update(botToken).digest();
    const arr = initData.split("&").sort();
    const hash = arr.find((x) => x.startsWith("hash=")).replace("hash=", "");
    const dataCheckString = arr.filter((x) => !x.startsWith("hash=")).join("\n");

    const hmac = crypto.createHmac("sha256", secret).update(dataCheckString).digest("hex");

    if (hmac !== hash) return res.status(403).json({ error: "Invalid initData" });

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
