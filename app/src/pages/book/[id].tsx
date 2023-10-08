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
} from "next/types";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { QueryClient, dehydrate, useQuery } from "react-query";
import { useRouter } from 'next/router';
import axios from "axios";
import books from "../../books.json";
import { AppLayout } from '@/components/AppLayout';

async function getBook(bookId: number) {
  const response = await axios.get<typeof books['results'][number]>(
   `https://gutendex.com/books/${bookId}`
  );
  return response.data;
}

export const getServerSideProps = (async (context) => {
  const bookId = parseInt(context.query.id as string);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['book', bookId], async () => getBook(bookId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}) satisfies GetServerSideProps;

export default function BookDetailsPage() {
  const router = useRouter();
  const bookId = parseInt(router.query.id as string)
  const { data } = useQuery({ queryKey: ['book', bookId], queryFn: async () => getBook(bookId)})

  if (!data) return "no data";

  const subjects: JSX.Element[] = [];
  const uniqueSubjects = new Set(
    data.subjects.flatMap((subject) => subject.split(" -- "))
  );
  uniqueSubjects.forEach((subject) => {
    subjects.push(<Chip key={subject} label={subject} />);
  });

  return (
    <>
      <Head>
        <title>GutendexApp - Library - {data.title}</title>
      </Head>
      <AppLayout>
          <Typography>#{data.id}</Typography>
          <Typography variant="h1">{data.title}</Typography>
          <Stack direction="row" alignItems="flex-start" spacing={2}>
            <Box
              component="img"
              src={data.formats['image/jpeg']}
              sx={{
                maxWidth: { lg: "38%" },
              }}
            />
            <Stack>
              <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
                {subjects}
              </Stack>
              <Typography sx={{ pt: 2 }} variant="h6">
                Author{data.authors.length > 1 ? "s" : ""}
              </Typography>
              <List sx={{ pt: 0 }}>
                {data.authors.length ? data.authors.map((author) => (
                  <ListItem key={author.name}>
                    <ListItemText
                      primary={author.name}
                      secondary={`${author.birth_year} - ${author.death_year}`}
                    />
                  </ListItem>
                )) : (
                  <ListItem key='unknown-author'>
                    <ListItemText primary="Unknown author" />
                  </ListItem>
                )}
              </List>
              <Typography sx={{ pt: 2 }} variant="h6">
                Formats
              </Typography>
              <List sx={{ pt: 0 }}>
                {(
                  Object.keys(
                    data.formats
                  ) as (keyof (typeof data)["formats"])[]
                ).map((format) => (
                  <ListItem key={format}>
                    <ListItemText
                      primary={format}
                      secondary={data.formats[format]}
                    />
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Stack>
        </AppLayout>
    </>
  );
}
