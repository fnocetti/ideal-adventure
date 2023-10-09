import { fetchFavorite } from "@/api/favoritesService";
import { extractBookId } from "@/helpers/extractBookId";
import { getOrCreateUserToken } from "@/helpers/session";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const user = getOrCreateUserToken(req, res);
    const bookId = extractBookId(req.query);
    fetchFavorite(bookId, user).then((isFavorite) => {
      res.json({ isFavorite });
    });
  } else {
    res.status(400).json({ error: "Bad request" });
  }
}
