import { isFavorite } from "@/api/favorites";
import { fetchFavorite } from "@/api/favoritesService";
import { UseQueryOptions } from "react-query";

const fnFor = {
  client: isFavorite,
  server: fetchFavorite,
};

export const getIsFavoriteQuery = (bookId: number, side: keyof typeof fnFor) =>
  ({
    queryKey: ["isFavorite", bookId],
    queryFn: async () => fnFor[side](bookId),
  } satisfies UseQueryOptions<boolean, unknown>);
