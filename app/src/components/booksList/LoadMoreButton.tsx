import {
  Button,
  CircularProgress,
} from "@mui/material";

interface LoadMoreButtonProps {
  isFetching: boolean;
  onLoadMore: () => void;
}

export function LoadMoreButton({ isFetching, onLoadMore }: LoadMoreButtonProps) {
  if (isFetching) {
    return <CircularProgress />
  }

  return <Button onClick={() => onLoadMore()} >Load more books</Button>
}