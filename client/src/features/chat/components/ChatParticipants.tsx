import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useChatParticipants } from "@/features/chat/hooks/useChatParticipants";

interface ChatParticipantsProps {
  selectedRoom: number | null;
}

const ChatParticipants: React.FC<ChatParticipantsProps> = ({
  selectedRoom,
}) => {
  const theme = useTheme();
  const participants = useChatParticipants(selectedRoom);

  return (
    <Box
      sx={{
        padding: theme.spacing(2),
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: theme.spacing(1),
          color: theme.palette.text.secondary,
        }}
      >
        Participants
      </Typography>
      <List>
        {participants.map((participant) => (
          <ListItem
            key={participant}
            component="div"
            sx={{
              textAlign: "left",
              color: theme.palette.secondary.main,
            }}
          >
            <ListItemText primary={participant} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatParticipants;
