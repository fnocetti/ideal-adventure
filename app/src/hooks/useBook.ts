import { useQuery } from "react-query";
import { getBook } from "@/api/books";

export function useBook(bookId: number) {
  const { data } = useQuery({
    queryKey: ["book", bookId],
    queryFn: async () => getBook(bookId),
  });

  return { book: data };
}