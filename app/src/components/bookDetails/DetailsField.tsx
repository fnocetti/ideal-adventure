import { Typography } from "@mui/material";

interface DetailsFieldProps {
  caption: string;
  children: JSX.Element | JSX.Element[];
}

export function DetailsField({ caption, children }: DetailsFieldProps) {
  return (
    <>
      <Typography sx={{ pt: 2 }} variant="h6">
        {caption}
      </Typography>
      {children}
    </>
  );
}
