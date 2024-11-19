import React, { FC } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link, useTheme } from "@mui/material";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: FC<NavLinkProps> = ({ to, children }) => {
  const theme = useTheme();
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <Link
      component={RouterLink}
      to={to}
      sx={{
        textDecoration: "none",
        fontSize: "20px",
        color: isActive
          ? theme.palette.secondary.main
          : theme.palette.text.secondary,
        fontWeight: "bold",
        "&:hover": {
          color: theme.palette.secondary.main,
        },
      }}
    >
      {children}
    </Link>
  );
};

export default NavLink;
