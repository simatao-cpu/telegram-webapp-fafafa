export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Only POST supported" });
  }

  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ ok: false, message: "Invalid amount" });
  }

  const withdrawId = "wd_" + Math.random().toString(36).slice(2);

  return res.status(200).json({
    ok: true,
    withdrawId,
    message: "提现申请已提交（示例）"
  });
}
