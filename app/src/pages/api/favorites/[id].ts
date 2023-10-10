import { deleteFavorite, fetchFavorite } from "@/api/favoritesService";
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
  } else if (req.method === "DELETE") {
    const user = getOrCreateUserToken(req, res);
    const bookId = extractBookId(req.query);
    deleteFavorite(bookId, user).then(() => {
      res.status(200).json({ message: "OK" });
    });
  } else {
    res.status(400).json({ error: "Bad request" });
  }
}
