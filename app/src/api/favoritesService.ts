import axios from "axios";

const FAVORITES_SERVIVE = "http://localhost:3004/favorites";

export function postAddToFavorites(bookId: number, userToken: string) {
  return axios.post(
    FAVORITES_SERVIVE,
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
      .get(`${FAVORITES_SERVIVE}/${bookId}`, {
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
