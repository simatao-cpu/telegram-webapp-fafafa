import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { userId, amount } = req.body;
  if (!userId || !amount) return res.status(400).json({ error: "Missing userId or amount" });

  const dbPath = path.join(process.cwd(), "database", "users.json");
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

  if (!data[userId]) data[userId] = { balance: 0 };

  data[userId].balance += amount;

  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

  res.status(200).json({ success: true, balance: data[userId].balance });
}
