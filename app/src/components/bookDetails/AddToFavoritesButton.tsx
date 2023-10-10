import { Button, CircularProgress } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface AddToFavoritesButtonProps {
  onAdd: () => void;
  onRemove: () => void;
  isLoading: boolean;
  isFavorite: boolean;
}

export function AddToFavoritesButton({
  onAdd,
  onRemove,
  isLoading,
  isFavorite,
}: AddToFavoritesButtonProps) {
  if (isFavorite) {
    return (
      <Button onClick={onRemove}>
        <StarIcon fontSize="medium" />
      </Button>
    );
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  return <Button onClick={onAdd}>Add to favorites</Button>;
}
