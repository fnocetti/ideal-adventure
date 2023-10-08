import { Box } from "@mui/material";
import Head from "next/head";
import { InferGetServerSidePropsType } from "next";
import { QueryClient, dehydrate } from "react-query";
import { AppLayout } from "@/components/AppLayout";
import { LoadMoreButton } from "@/components/booksList/LoadMoreButton";
import { BooksList } from "@/components/booksList/BooksList";
import { BooksCount } from "@/components/booksList/BooksCount";
import { FIRST_PAGE } from "@/api/books";
import { useBooksLibrary } from "@/hooks/useBooksLibrary";
import { getBooksLibraryQuery } from "@/queries/books";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(getBooksLibraryQuery());

  const dehydratedState = dehydrate(queryClient);

  // This is a workaround for https://github.com/TanStack/query/issues/1458
  const queryData = dehydratedState.queries[0].state.data;
  if (
    typeof queryData === "object" &&
    queryData !== null &&
    "pageParams" in queryData
  ) {
    // Since we're using the full url for the pageParam, the first one is the url of the first page
    queryData.pageParams = [FIRST_PAGE];
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
  const { books, count, total, isLoading, loadMore } = useBooksLibrary();

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
          <LoadMoreButton isLoading={isLoading} onLoadMore={loadMore} />
        </Box>
      </AppLayout>
    </>
  );
}
