import { getCookie, setCookie } from "cookies-next";
import { DefaultOptions } from "cookies-next/lib/types";
import { NextApiRequest, NextApiResponse } from "next";

function createUser() {
  return `${Math.random() * 10000}`;
}

export function getOrCreateUserToken(
  req: NextApiRequest | DefaultOptions["req"],
  res: NextApiResponse | DefaultOptions["res"]
) {
  let user = getCookie("session-cookie", { req, res });
  if (!user) {
    user = createUser();
    setCookie("session-cookie", user, { req, res, httpOnly: true });
  }
  return user;
}
