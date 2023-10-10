import axios from "axios";

export interface IsFavorite {
  isFavorite: boolean;
}

export function addToFavorites(bookId: number) {
  return axios.post("/api/favorites", { bookId });
}

export function removeFromFavorites(bookId: number) {
  return axios.delete(`/api/favorites/${bookId}`);
}

export async function isFavorite(bookId: number) {
  const {
    data: { isFavorite },
  } = await axios.get<IsFavorite>(`/api/favorites/${bookId}`);
  return isFavorite;
}
