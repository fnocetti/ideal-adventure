import { getCookie, setCookie } from "cookies-next";
import { DefaultOptions } from "cookies-next/lib/types";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

function createUser() {
  return randomUUID();
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
