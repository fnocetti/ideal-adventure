import { useInfiniteQuery } from "react-query";
import { getBooks } from "@/api/books";

export function useBooksLibrary() {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["books"],
    queryFn: async ({ pageParam }) => getBooks(pageParam),
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const books = data?.pages.flatMap((page) => page.results) ?? [];
  const count = data?.pages.reduce((count, page) => count + page.results.length, 0) ?? 0;
  const total = data?.pages[data.pages.length - 1].count ?? 0;

  return {
    books,
    count,
    total,
    isLoading: isFetchingNextPage,
    loadMore: () => fetchNextPage(),
  }
}