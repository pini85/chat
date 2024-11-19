import { Typography, Container } from "@mui/material";

export const Home = () => {
  return (
    <main>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h1" color="primary.contrastText" gutterBottom>
          Let’s Chat
        </Typography>
        <Typography
          variant="h2"
          color="secondary.main"
          gutterBottom
          sx={{ fontSize: "1.5rem" }}
        >
          Join real-time group chats instantly!
        </Typography>
        <Typography
          variant="body1"
          color="primary.contrastText"
          gutterBottom
          sx={{ maxWidth: 600, margin: "0 auto" }}
        >
          Let’s Chat is a simple and fast group chat application where you can
          interact in predefined chat groups, share messages, and see real-time
          read receipts.
        </Typography>
      </Container>
    </main>
  );
};
