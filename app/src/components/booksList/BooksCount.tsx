import { Typography } from "@mui/material";

interface BooksCountProps {
  count: number;
  total: number;
}

export function BooksCount({ count, total }: BooksCountProps) {
  return (
    <Typography>
      Showing {count} out of {total} books
    </Typography>
  );
}
