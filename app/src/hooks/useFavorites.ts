import { addToFavorites, removeFromFavorites } from "@/api/favorites";
import { getIsFavoriteQueryForClient } from "@/queries/favorites";
import { useMutation, useQuery } from "react-query";

export function useFavorites(bookId: number) {
  const addMutation = useMutation((id: number) => {
    return addToFavorites(id);
  });

  const removeMutation = useMutation((id: number) => {
    return removeFromFavorites(id);
  });

  const { data: isFavoriteResult } = useQuery(
    getIsFavoriteQueryForClient(bookId)
  );

  return {
    addToFavorites: () => {
      removeMutation.reset();
      addMutation.mutate(bookId);
    },
    removeFromFavorites: () => {
      addMutation.reset();
      removeMutation.mutate(bookId);
    },
    isFavorite:
      (isFavoriteResult && !removeMutation.isSuccess) || addMutation.isSuccess,
    isLoading: addMutation.isLoading || removeMutation.isLoading,
  };
}
