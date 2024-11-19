import React from "react";
import { Outlet } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import Header from "@/layouts/Header/Header";

const MainLayout: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Header />

      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: theme.spacing(2),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
