import axios from "axios";

export function addToFavorites(bookId: number) {
  return axios.post("/api/favorites", { bookId });
}
