import {
  AppBar,
  Avatar,
  Button,
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
import { QueryClient, dehydrate, useInfiniteQuery } from 'react-query';
import axios from 'axios';

async function getBooks() {
  const response = await axios.get<typeof books>('http://gutendex.com/books');
  return response.data;
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(['books'], getBooks, {
    getNextPageParam: lastPage => lastPage.next || null,
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    }
  };
}

type BooksLibraryPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export default function BooksLibraryPage({}: BooksLibraryPageProps) {
  const { data } = useInfiniteQuery({ queryKey: ['books'], queryFn: getBooks, getNextPageParam: lastPage => lastPage.next });

  if(!data) return null;

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
            {pages.flatMap(page => page.results).map((book) => (
              <>
                <ListItem key={book.id} alignItems="flex-start">
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
              </>
            ))}
          </List>
          <Typography>
            Showing {count} out of {total} books
          </Typography>
          <Button>Load more books</Button>
        </Container>
      </main>
    </>
  );
}
