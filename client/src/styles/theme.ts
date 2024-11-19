import { createTheme, Theme } from "@mui/material/styles";

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#524763",
      light: "#625577",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#82d8d8",
      light: "#cdffef",
      contrastText: "#333333",
    },
    text: {
      primary: "#333333",
      secondary: "#ffffff",
    },
    background: {
      default: "#524763",
      paper: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: '"Asap Condensed", sans-serif',
    h1: {
      fontFamily: '"League Gothic", sans-serif',
    },
    h2: {
      fontFamily: '"League Gothic", sans-serif',
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"League Gothic", sans-serif',
    },
    h4: {
      fontFamily: '"League Gothic", sans-serif',
    },
    h5: {
      fontFamily: '"Asap Condensed", sans-serif',
    },
    h6: {
      fontFamily: '"Asap Condensed", sans-serif',
    },
    button: {
      fontFamily: '"Asap Condensed", sans-serif',
    },
  },
});

export default theme;
