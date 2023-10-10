import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

interface AppLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <LocalLibraryIcon sx={{ mr: 2 }} />
          <Typography variant="h5"> Bookshop</Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ py: 4 }}>
        <Container maxWidth="md">{children}</Container>
      </Box>
    </>
  );
}
