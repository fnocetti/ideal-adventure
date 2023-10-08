import {
  Box,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Head from "next/head";
import type { GetServerSideProps } from "next/types";
import { QueryClient, dehydrate, useQuery } from "react-query";
import { useRouter } from "next/router";
import { AppLayout } from "@/components/AppLayout";
import { Format, getBook } from "@/api/books";
import { SubjectsChips } from "@/components/bookDetails/SubjectsChips";
import { DetailsField } from "@/components/bookDetails/DetailsField";

export const getServerSideProps = (async (context) => {
  const bookId = parseInt(context.query.id as string);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["book", bookId], async () =>
    getBook(bookId)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}) satisfies GetServerSideProps;

export default function BookDetailsPage() {
  const router = useRouter();
  const bookId = parseInt(router.query.id as string);
  const { data } = useQuery({
    queryKey: ["book", bookId],
    queryFn: async () => getBook(bookId),
  });

  if (!data) return "no data";

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
            src={data.formats["image/jpeg"]}
            sx={{
              maxWidth: { lg: "38%" },
            }}
          />
          <Stack>
            <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
              <SubjectsChips subjects={data.subjects} />
            </Stack>
            <DetailsField
              caption={`Author${data.authors.length > 1 ? "s" : ""}`}
            >
              <List sx={{ pt: 0 }}>
                {data.authors.length ? (
                  data.authors.map((author) => (
                    <ListItem key={author.name}>
                      <ListItemText
                        primary={author.name}
                        secondary={`${author.birth_year} - ${author.death_year}`}
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem key="unknown-author">
                    <ListItemText primary="Unknown author" />
                  </ListItem>
                )}
              </List>
            </DetailsField>
            <DetailsField caption="Formats">
              <List sx={{ pt: 0 }}>
                {(Object.keys(data.formats) as Format[]).map((format) => (
                  <ListItem key={format}>
                    <ListItemText
                      primary={format}
                      secondary={data.formats[format]}
                    />
                  </ListItem>
                ))}
              </List>
            </DetailsField>
          </Stack>
        </Stack>
      </AppLayout>
    </>
  );
}
