import { Button, CircularProgress } from "@mui/material";

interface LoadMoreButtonProps {
  isLoading: boolean;
  onLoadMore: () => void;
}

export function LoadMoreButton({ isLoading, onLoadMore }: LoadMoreButtonProps) {
  if (isLoading) {
    return <CircularProgress />;
  }

  return <Button onClick={() => onLoadMore()}>Load more books</Button>;
}
