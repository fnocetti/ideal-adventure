import { Box } from "@mui/material";
import Head from "next/head";
import books from "../books.json";
import { InferGetServerSidePropsType } from "next";
import { QueryClient, dehydrate, useInfiniteQuery } from "react-query";
import axios from "axios";
import { AppLayout } from "@/components/AppLayout";
import { LoadMoreButton } from "@/components/booksList/LoadMoreButton";
import { BooksList } from "@/components/booksList/BooksList";
import { BooksCount } from "@/components/booksList/BooksCount";

async function getBooks({ pageParam }: { pageParam?: string }) {
  const response = await axios.get<typeof books>(
    pageParam ?? "https://gutendex.com/books/"
  );
  return response.data;
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(["books"], getBooks, {
    getNextPageParam: (lastPage) => lastPage.next,
  });

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
    queryFn: getBooks,
    getNextPageParam: (lastPage) => lastPage.next,
  });

  if (!data) return "loading";

  const { pages } = data;

  return (
    <>
      <Head>
        <title>GutendexApp - Library</title>
      </Head>
      <AppLayout>
        <Box textAlign="center">
          <BooksCount pages={pages} />
          <BooksList pages={pages} />
          <BooksCount pages={pages} />
          <LoadMoreButton
            isFetching={isFetchingNextPage}
            onLoadMore={() => fetchNextPage()}
          />
        </Box>
      </AppLayout>
    </>
  );
}
