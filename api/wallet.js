import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const dbPath = path.join(process.cwd(), "database", "users.json");

  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "Missing userId" });

  const balance = data[userId]?.balance || 0;

  res.status(200).json({ userId, balance });
}
