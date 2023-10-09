import { addToFavorites } from "@/api/favorites";
import { useMutation } from "react-query";

export function useFavorites(bookId: number) {
  const mutation = useMutation((id: number) => {
    return addToFavorites(id);
  });

  return {
    addToFavorites: () => mutation.mutate(bookId),
    isFavorite: mutation.isSuccess,
    isAddingToFavorites: mutation.isLoading,
  };
}
