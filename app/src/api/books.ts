import books from "../books.json";
import axios from "axios";

const HOST = 'https://gutendex.com';

export async function getBooks(pageUrl?: string) {
  const response = await axios.get<typeof books>(
    pageUrl ?? `${HOST}/books/`
  );
  return response.data;
}

export async function getBook(bookId: number) {
  const response = await axios.get<typeof books['results'][number]>(
   `${HOST}/books/${bookId}`
  );
  return response.data;
}

