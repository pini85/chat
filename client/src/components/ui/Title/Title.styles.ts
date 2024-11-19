import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";

// Container for the entire title
export const Container = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(4, 0),
}));

// Styling for the first letter of the title
export const FirstLetter = styled(Typography)(({ theme }) => ({
  position: "relative",
  textTransform: "capitalize",
  fontSize: "2.5rem",
  color: theme.palette.secondary.main,
  letterSpacing: "5px",

  "&::before": {
    content: '""',
    position: "absolute",
    bottom: "4px",
    left: "-3px",
    height: "2px",
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-2px",
    left: "2px",
    height: "2px",
    width: "70%",
    backgroundColor: theme.palette.common.white,
  },
}));

// Styling for the rest of the title
export const RestOfTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "2.5rem",
  letterSpacing: "3px",
}));
