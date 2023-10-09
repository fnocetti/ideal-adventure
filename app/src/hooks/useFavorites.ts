import { addToFavorites } from "@/api/favorites";
import { getIsFavoriteQuery } from "@/queries/favorites";
import { useMutation, useQuery } from "react-query";

export function useFavorites(bookId: number) {
  const mutation = useMutation((id: number) => {
    return addToFavorites(id);
  });

  const { data: isFavoriteResult } = useQuery(
    getIsFavoriteQuery(bookId, "client")
  );

  return {
    addToFavorites: () => mutation.mutate(bookId),
    isFavorite: isFavoriteResult || mutation.isSuccess,
    isAddingToFavorites: mutation.isLoading,
  };
}
