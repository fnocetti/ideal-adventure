import { Box, Stack, Typography } from "@mui/material";
import Head from "next/head";
import type { GetServerSideProps } from "next/types";
import { QueryClient, dehydrate, useQuery } from "react-query";
import { useRouter } from "next/router";
import { AppLayout } from "@/components/AppLayout";
import { getBook } from "@/api/books";
import { SubjectsChips } from "@/components/bookDetails/SubjectsChips";
import { DetailsField } from "@/components/bookDetails/DetailsField";
import { AuthorsList } from "@/components/bookDetails/AuthorsList";
import { FormatsList } from "@/components/bookDetails/FormatsList";
import { useBook } from "@/hooks/useBook";
import type { ParsedUrlQuery } from "querystring";

function extractBookId(query: ParsedUrlQuery) {
  return parseInt(query.id as string);
}

export const getServerSideProps = (async (context) => {
  const bookId = extractBookId(context.query);
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
  const { book } = useBook(extractBookId(router.query));

  if (!book) return "no data";

  return (
    <>
      <Head>
        <title>GutendexApp - Library - {book.title}</title>
      </Head>
      <AppLayout>
        <Typography>#{book.id}</Typography>
        <Typography variant="h1">{book.title}</Typography>
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <Box
            component="img"
            src={book.formats["image/jpeg"]}
            sx={{
              maxWidth: { lg: "38%" },
            }}
          />
          <Stack>
            <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
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
