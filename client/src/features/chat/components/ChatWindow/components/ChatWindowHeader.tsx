import React from "react";
import { Typography } from "@mui/material";
import { ChatWindowProps } from "@/features/chat/types";
const ChatWindowHeader: React.FC<ChatWindowProps> = ({
  isMobile,
  selectedRoom,
}) => {
  return (
    <Typography
      variant="h5"
      sx={{
        fontSize: isMobile ? "1rem" : "1.5rem",
        marginBottom: isMobile ? 1 : 2,
      }}
    >
      {selectedRoom ? `Room: ${selectedRoom}` : "Select a room"}
    </Typography>
  );
};
export default ChatWindowHeader;
