import { Button, CircularProgress } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface AddToFavoritesButtonProps {
  onAdd: () => void;
  isAdding: boolean;
  isFavorite: boolean;
}

export function AddToFavoritesButton({
  onAdd,
  isAdding,
  isFavorite,
}: AddToFavoritesButtonProps) {
  if (isFavorite) {
    return <StarIcon fontSize="large" />;
  }

  if (isAdding) {
    return <CircularProgress />;
  }

  return <Button onClick={onAdd}>Add to favorites</Button>;
}
