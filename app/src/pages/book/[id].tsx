import { Box, Button, Stack, Typography } from "@mui/material";
import Head from "next/head";
import type { GetServerSideProps } from "next/types";
import { QueryClient, dehydrate } from "react-query";
import { useRouter } from "next/router";
import { AppLayout } from "@/components/AppLayout";
import { SubjectsChips } from "@/components/bookDetails/SubjectsChips";
import { DetailsField } from "@/components/bookDetails/DetailsField";
import { AuthorsList } from "@/components/bookDetails/AuthorsList";
import { FormatsList } from "@/components/bookDetails/FormatsList";
import { useBook } from "@/hooks/useBook";
import type { ParsedUrlQuery } from "querystring";
import { getBookQuery } from "@/queries/books";
import { AddToFavoritesButton } from "@/components/bookDetails/AddToFavoritesButton";

function extractBookId(query: ParsedUrlQuery) {
  return parseInt(query.id as string);
}

export const getServerSideProps = (async (context) => {
  const bookId = extractBookId(context.query);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getBookQuery(bookId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}) satisfies GetServerSideProps;

export default function BookDetailsPage() {
  const router = useRouter();
  const { book } = useBook(extractBookId(router.query));

  if (!book) return "no data";

  return (
    <>
      <Head>
        <title>GutendexApp - Library - {book.title}</title>
      </Head>
      <AppLayout>
        <Typography>#{book.id}</Typography>
        <Typography variant="h3" component="h1" paddingBottom={2}>
          {book.title}
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "center", md: "flex-start" }}
          spacing={2}
        >
          <Stack
            sx={{ maxWidth: { xs: "80%", md: "38%" } }}
            spacing={2}
            alignItems="center"
          >
            <AddToFavoritesButton
              isAdding={true}
              isFavorite={true}
              onAdd={() => {}}
            />
            <Box component="img" src={book.formats["image/jpeg"]} />
          </Stack>
          <Stack>
            <Stack
              direction="row"
              useFlexGap
              flexWrap="wrap"
              spacing={1}
              paddingTop={2}
            >
              <SubjectsChips subjects={book.subjects} />
            </Stack>
            <DetailsField caption="Author">
              <AuthorsList authors={book.authors} />
            </DetailsField>
            <DetailsField caption="Formats">
              <FormatsList formats={book.formats} />
            </DetailsField>
          </Stack>
        </Stack>
      </AppLayout>
    </>
  );
}
