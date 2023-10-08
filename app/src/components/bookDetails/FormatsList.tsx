import { Book, Format } from "@/api/books";
import { List, ListItem, ListItemText } from "@mui/material";

interface FormatsListProps {
  formats: Book["formats"];
}

export function FormatsList({ formats }: FormatsListProps) {
  const formatKeys = Object.keys(formats) as Format[];
  return (
    <List sx={{ pt: 0 }}>
      {formatKeys.map((format) => (
        <ListItem
          key={format}
          sx={{
            overflow: "hidden",
            overflowWrap: "anywhere",
          }}
        >
          <ListItemText primary={format} secondary={formats[format]} />
        </ListItem>
      ))}
    </List>
  );
}
