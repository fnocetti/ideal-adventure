import { fetchFavorite } from "@/api/favoritesService";
import { extractBookId } from "@/helpers/extractBookId";
import { getCookie, setCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    let user = getCookie("session-cookie", { req, res });
    if (!user) {
      user = `${Math.random() * 10000}`;
      setCookie("session-cookie", user, { req, res, httpOnly: true });
    }
    const bookId = extractBookId(req.query);
    fetchFavorite(bookId, user).then((isFavorite) => {
      res.json({ isFavorite });
    });
  } else {
    res.status(400).json({ error: "Bad request" });
  }
}
