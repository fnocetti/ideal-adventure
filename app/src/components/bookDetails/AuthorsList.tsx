import { Author } from "@/api/books";
import { List, ListItem, ListItemText } from "@mui/material";

interface AuthorsListProps {
  authors: Author[];
}

export function AuthorsList({ authors }: AuthorsListProps) {
  return (
    <List sx={{ pt: 0 }}>
      {authors.length ? (
        authors.map((author) => (
          <ListItem key={author.name}>
            <ListItemText
              primary={author.name}
              secondary={`${author.birth_year ?? "Unknown"} - ${
                author.death_year ?? "Unknown"
              }`}
            />
          </ListItem>
        ))
      ) : (
        <ListItem key="unknown-author">
          <ListItemText primary="Unknown author" />
        </ListItem>
      )}
    </List>
  );
}
