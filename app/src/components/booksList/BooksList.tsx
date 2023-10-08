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
import { Book } from "@/api/books";

interface BooksListProps {
  books: Book[];
}

export function BooksList({ books }: BooksListProps) {
  return (
    <>
      <List>
        {books.map((book, index) => (
          <Fragment key={book.id}>
            {index === 0 ? <Divider /> : null}
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
