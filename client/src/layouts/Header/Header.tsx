import {
  AppBar,
  Toolbar,
  Button,
  Box,
  List,
  ListItem,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";
import NavLink from "./components/NavLink";
import { Paths } from "@/config/paths";

interface ILink {
  name: string;
  path: string;
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  padding: theme.spacing(2),
}));

const StyledList = styled(List)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  padding: 0,
  listStyle: "none",
}));

const Header = () => {
  const { logout, user } = useAuthContext();

  // Define links based on authentication status
  const links: ILink[] = [
    { name: "Home", path: Paths.HOME },
    { name: "Chat", path: Paths.CHAT },
    // Only show "Login" if there is no user
    ...(user ? [] : [{ name: "Login", path: Paths.LOGIN }]),
  ];

  const theme = useTheme();

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box component="nav">
          <StyledList>
            {links.map((link: ILink) => (
              <ListItem key={link.path} disablePadding>
                <NavLink to={link.path}>{link.name}</NavLink>
              </ListItem>
            ))}
          </StyledList>
        </Box>

        {/* Show "Log Out" button only if user is logged in */}
        {user && (
          <Button
            onClick={logout}
            variant="contained"
            color="secondary"
            sx={{ marginLeft: theme.spacing(2) }}
          >
            Log Out
          </Button>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
