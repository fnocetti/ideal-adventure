import { Fragment } from "react";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import books from "../../books.json";

interface BooksListProps {
  pages: (typeof books)[];
}

export function BooksList({ pages }: BooksListProps) {
  return (
    <>
      <Divider />
      <List>
        {pages
          .flatMap((page) => page.results)
          .map((book) => (
            <Fragment key={book.id}>
              <ListItem alignItems="flex-start">
                <ListItemButton href={`/book/${book.id}`} LinkComponent={Link}>
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
            </Fragment>
          ))}
      </List>
    </>
  );
}
