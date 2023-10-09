import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    res.status(201).json({ message: "Added to favorites" });
  } else {
    res.status(404).json({ error: "Not found" });
  }
}
