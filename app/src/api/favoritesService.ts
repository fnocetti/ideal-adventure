import axios from "axios";

const FAVORITES_SERVICE =
  process.env.FAVORITES_SERVICE ?? "http://localhost:3004";

export function postAddToFavorites(bookId: number, userToken: string) {
  return axios.post(
    `${FAVORITES_SERVICE}/favorites`,
    { bookId },
    {
      headers: {
        Authorization: userToken,
      },
    }
  );
}

export async function fetchFavorite(bookId: number, userToken: string) {
  return new Promise<boolean>((resolve, reject) => {
    axios
      .get(`${FAVORITES_SERVICE}/favorites/${bookId}`, {
        headers: {
          Authorization: userToken,
        },
      })
      .then((response) => {
        resolve(response.status === 200);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          resolve(false);
        } else {
          reject(error);
        }
      });
  });
}

export async function deleteFavorite(bookId: number, userToken: string) {
  return axios.delete(`${FAVORITES_SERVICE}/favorites/${bookId}`, {
    headers: {
      Authorization: userToken,
    },
  });
}
