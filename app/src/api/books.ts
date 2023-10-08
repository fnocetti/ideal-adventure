import axios from "axios";

export type Format = 
  | "application/x-mobipocket-ebook"
  | "application/epub+zip" 
  | "text/html"
  | "application/octet-stream"
  | "image/jpeg"
  | "text/plain"
  | "text/plain"
  | "application/rdf+xml"
  | "text/plain; charset=utf-8"
  | "text/html; charset=utf-8"
  | "text/plain; charset=us-ascii"
  | "text/plain; charset=iso-8859-1"
  | "text/html; charset=iso-8859-1";

interface Author {
  name: string,
  birth_year: number,
  death_year: number
};
export interface Book {
  id: number,
  title: string,
  authors: Author[],
  translators: [],
  subjects: string[],
  bookshelves: [],
  languages: string[],
  copyright: boolean,
  media_type: string,
  formats: Record<Format, string>,
  download_count: number
}

interface BooksResults {
  count: number;
  next: string;
  previous: string;
  results: Book[];
}

const HOST = 'https://gutendex.com';

export async function getBooks(pageUrl?: string) {
  const response = await axios.get<BooksResults>(
    pageUrl ?? `${HOST}/books/`
  );
  return response.data;
}

export async function getBook(bookId: number) {
  const response = await axios.get<Book>(
   `${HOST}/books/${bookId}`
  );
  return response.data;
}

