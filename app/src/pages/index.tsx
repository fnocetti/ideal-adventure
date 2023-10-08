import {
  AppBar,
  Avatar,
  Button,
  CircularProgress,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import Head from "next/head";
import books from "../books.json";
import Link from "next/link";
import { InferGetServerSidePropsType } from "next";
import { QueryClient, dehydrate, useInfiniteQuery } from "react-query";
import axios from "axios";
import { Fragment } from "react";

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
      <AppBar position="relative">
        <Toolbar>
          <LocalLibraryIcon sx={{ mr: 2 }} />
          <Typography variant="h5"> GutendexApp</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography>
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
          <Typography>
            Showing {count} out of {total} books
          </Typography>
          {isFetchingNextPage ? (
            <CircularProgress />
          ) : (
            <Button onClick={() => fetchNextPage()}>Load more books</Button>
          )}
        </Container>
      </main>
    </>
  );
}
