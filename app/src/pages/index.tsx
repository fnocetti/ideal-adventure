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

export async function getServerSideProps() {
  return {
    props: {
      books: books.results,
      count: books.count,
    },
  };
}

type BooksLibraryPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export default function BooksLibraryPage({
  books,
  count,
}: BooksLibraryPageProps) {
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
            Showing {books.length} out of {count} books
          </Typography>
          <List>
            {books.map((book, index, allBooks) => (
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
                {index < allBooks.length - 1 ? <Divider /> : null}
              </>
            ))}
          </List>
          <Typography>
            Showing {books.length} out of {count} books
          </Typography>
          <Button>Load more books</Button>
        </Container>
      </main>
    </>
  );
}
