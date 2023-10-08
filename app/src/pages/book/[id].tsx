import {
  AppBar,
  Box,
  Container,
  Stack,
  Toolbar,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Head from "next/head";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next/types";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import books from '../../books.json';

export const getServerSideProps = (async () => {
  const book = books.results[0];

  return {
    props: {
      book,
    },
  };
}) satisfies GetServerSideProps;

export default function BookDetailsPage({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const subjects: JSX.Element[] = [];
  const uniqueSubjects = new Set(book.subjects.flatMap(subject => subject.split(' -- ')));
  uniqueSubjects.forEach(subject => {
    subjects.push(<Chip key={subject} label={subject} />)
  })
  return (
    <>
      <Head>
        <title>GutendexApp - Library - {book.title}</title>
      </Head>
      <AppBar position="relative">
        <Toolbar>
          <LocalLibraryIcon sx={{ mr: 2 }} />
          <Typography variant="h5"> GutendexApp</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="md">
          <Typography>#{book.id}</Typography>
          <Typography variant="h1">{book.title}</Typography>
          <Stack direction='row' alignItems='flex-start' spacing={2}>
            <Box
              component="img"
              src="https://www.gutenberg.org/cache/epub/1513/pg1513.cover.medium.jpg"
              sx={{
                maxWidth: { lg: "38%" },
              }}
            />
            <Stack>
              <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
                {subjects}
              </Stack>
              <Typography sx={{ pt: 2 }} variant='h6'>Author{book.authors.length > 1 ? 's' : ''}</Typography>
              <List sx={{ pt: 0 }}>
                {
                  book.authors.map(author => (
                    <ListItem key={author.name}>
                      <ListItemText primary={author.name} secondary={`${author.birth_year} - ${author.death_year}`} />
                    </ListItem>
                  ))
                }
              </List>
              <Typography sx={{ pt: 2 }} variant='h6'>Formats</Typography>
              <List sx={{ pt: 0 }}>
                {
                  (Object.keys(book.formats) as (keyof typeof book['formats'])[]).map(format => (
                    <ListItem key={format}>
                      <ListItemText primary={format} secondary={book.formats[format]} />
                    </ListItem>
                  ))
                }
              </List>
            </Stack>
          </Stack>
        </Container>
      </main>
    </>
  );
}
