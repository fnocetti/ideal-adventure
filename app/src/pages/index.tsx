import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Head from "next/head";
import books from "../books.json";
import Link from "next/link";
import { InferGetServerSidePropsType } from "next";
import { QueryClient, dehydrate, useInfiniteQuery } from "react-query";
import axios from "axios";
import { Fragment } from "react";
import { AppLayout } from '@/components/AppLayout';
import { LoadMoreButton } from '@/components/booksList/LoadMoreButton';

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

  if (!data) return 'loading';

  const { pages } = data;

  const count = pages.reduce((count, page) => count + page.results.length, 0);
  const total = pages[pages.length - 1].count;

  return (
    <>
      <Head>
        <title>GutendexApp - Library</title>
      </Head>
      <AppLayout>
          <Typography textAlign='center'>
            Showing {count} out of {total} books
          </Typography>
          <Divider />
          <List>
            {pages
              .flatMap((page) => page.results)
              .map((book) => (
                <Fragment key={book.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemButton
                      href={`/book/${book.id}`}
                      LinkComponent={Link}
                    >
                      <ListItemAvatar>
                        <Avatar
                          variant="rounded"
                          alt={book.title}
                          src={book.formats["image/jpeg"]}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={book.title}
                        secondary={book.authors
                          .map((author) => author.name)
                          .join("; ")}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </Fragment>
              ))}
          </List>
          <Typography textAlign='center'>
            Showing {count} out of {total} books
          </Typography>
          <Box textAlign='center'>
            <LoadMoreButton isFetching={isFetchingNextPage} onLoadMore={() => fetchNextPage()} />
          </Box>
        </AppLayout>
    </>
  );
}
