export default async function handler(req, res) {
  const balance = 999.99; // 示例余额，可查数据库

  return res.status(200).json({
    ok: true,
    balance
  });
}
