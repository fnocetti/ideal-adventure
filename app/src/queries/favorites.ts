import { isFavorite } from "@/api/favorites";
import { fetchFavorite } from "@/api/favoritesService";
import { UseQueryOptions } from "react-query";

const buildQuery = (bookId: number, queryFn: () => Promise<boolean>) =>
  ({
    queryKey: ["isFavorite", bookId],
    queryFn,
  } satisfies UseQueryOptions<boolean, unknown>);

export const getIsFavoriteQueryForServer = (bookId: number, user: string) =>
  buildQuery(bookId, async () => fetchFavorite(bookId, user));

export const getIsFavoriteQueryForClient = (bookId: number) =>
  buildQuery(bookId, async () => isFavorite(bookId));
