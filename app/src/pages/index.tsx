import { Box } from "@mui/material";
import Head from "next/head";
import { InferGetServerSidePropsType } from "next";
import { QueryClient, dehydrate, useInfiniteQuery } from "react-query";
import { AppLayout } from "@/components/AppLayout";
import { LoadMoreButton } from "@/components/booksList/LoadMoreButton";
import { BooksList } from "@/components/booksList/BooksList";
import { BooksCount } from "@/components/booksList/BooksCount";
import { getBooks } from "@/api/books";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    ["books"],
    async ({ pageParam }) => getBooks(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next,
    }
  );

  const dehydratedState = dehydrate(queryClient);

  // This is a workaround for https://github.com/TanStack/query/issues/1458
  const queryData = dehydratedState.queries[0].state.data;
  if (
    typeof queryData === "object" &&
    queryData !== null &&
    "pageParams" in queryData
  ) {
    // Since we're using the full url for the pageParam, the first one is the url of the first page
    queryData.pageParams = ["https://gutendex.com/books/"];
  }

  return {
    props: {
      dehydratedState,
    },
  };
}

type BooksLibraryPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export default function BooksLibraryPage({}: BooksLibraryPageProps) {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["books"],
    queryFn: async ({ pageParam }) => getBooks(pageParam),
    getNextPageParam: (lastPage) => lastPage.next,
  });

  if (!data) return "loading";

  const { pages } = data;
  const books = pages.flatMap((page) => page.results);
  const count = pages.reduce((count, page) => count + page.results.length, 0);
  const total = pages[pages.length - 1].count;

  return (
    <>
      <Head>
        <title>GutendexApp - Library</title>
      </Head>
      <AppLayout>
        <Box textAlign="center">
          <BooksCount count={count} total={total} />
          <BooksList books={books} />
          <BooksCount count={count} total={total} />
          <LoadMoreButton
            isFetching={isFetchingNextPage}
            onLoadMore={() => fetchNextPage()}
          />
        </Box>
      </AppLayout>
    </>
  );
}
