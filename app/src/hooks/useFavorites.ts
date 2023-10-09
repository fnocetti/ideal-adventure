import { addToFavorites, isFavorite } from "@/api/favorites";
import { useMutation, useQuery } from "react-query";

export function useFavorites(bookId: number) {
  const mutation = useMutation((id: number) => {
    return addToFavorites(id);
  });

  const { data: isFavoriteResult } = useQuery({
    queryKey: ["isFavorite", bookId],
    queryFn: async () => isFavorite(bookId),
  });

  return {
    addToFavorites: () => mutation.mutate(bookId),
    isFavorite: isFavoriteResult || mutation.isSuccess,
    isAddingToFavorites: mutation.isLoading,
  };
}
