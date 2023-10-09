import { Book, BooksResults, getBook, getBooks } from "@/api/books";
import type { UseQueryOptions } from "react-query";

export const getBookQuery = (bookId: number) =>
  ({
    queryKey: ["book", bookId],
    queryFn: async () => getBook(bookId),
  } satisfies UseQueryOptions<Book, unknown>);

export const getBooksLibraryQuery = () =>
  ({
    queryKey: ["books"],
    queryFn: async ({ pageParam }) => getBooks(pageParam),
    getNextPageParam: (lastPage) => lastPage.next,
  } satisfies UseQueryOptions<BooksResults, unknown, BooksResults, string[]>);
