import { postAddToFavorites } from "@/api/favoritesService";
import { getOrCreateUserToken } from "@/helpers/session";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { bookId } = req.body;
    if (typeof bookId === "number") {
      const user = getOrCreateUserToken(req, res);

      postAddToFavorites(bookId, user).then((response) => {
        if (response.status === 201) {
          res.status(201).json({ message: "Added to favorites" });
        } else {
          res.status(500).json({ error: response.data });
        }
      });
    } else {
      res.status(400).json({ error: "Bad request" });
    }
  } else {
    res.status(404).json({ error: "Not found" });
  }
}
