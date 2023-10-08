import { Typography } from "@mui/material";
import books from "../../books.json";

interface BooksCountProps {
  pages: (typeof books)[];
}

export function BooksCount({ pages }: BooksCountProps) {
  const count = pages.reduce((count, page) => count + page.results.length, 0);
  const total = pages[pages.length - 1].count;

  return (
    <Typography>
      Showing {count} out of {total} books
    </Typography>
  );
}
