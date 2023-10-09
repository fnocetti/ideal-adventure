import type { ParsedUrlQuery } from "querystring";

export function extractBookId(query: ParsedUrlQuery) {
  return parseInt(query.id as string);
}
