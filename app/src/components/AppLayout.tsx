import { AppBar, Container, Toolbar, Typography } from "@mui/material";
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
          <Typography variant="h5"> GutendexApp</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="md">
          {children}
        </Container>
      </main>
    </>
  );
}
