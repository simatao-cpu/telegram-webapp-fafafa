export default async function handler(req, res) {
  const balance = 1000.00;
  res.status(200).json({ balance });
}
