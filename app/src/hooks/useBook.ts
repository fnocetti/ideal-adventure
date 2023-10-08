import { useQuery } from "react-query";
import { getBookQuery } from '@/queries/books';

export function useBook(bookId: number) {
  const { data } = useQuery(getBookQuery(bookId));
  return { book: data };
}