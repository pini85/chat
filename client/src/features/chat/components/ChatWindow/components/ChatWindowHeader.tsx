import React from "react";
import { Typography } from "@mui/material";
import { ChatWindowProps } from "@/features/chat/types";
import chatRooms from "../../../utils/chatRooms";

const ChatWindowHeader: React.FC<ChatWindowProps> = ({
  isMobile,
  selectedRoom,
}) => {
  const room = chatRooms.find((room) => room.id === selectedRoom);
  const roomName = room ? room.name : "Select a room";
  return (
    <Typography
      variant="h5"
      color="primary.contrastText"
      sx={{
        fontSize: isMobile ? "1rem" : "1.5rem",
        marginBottom: isMobile ? 1 : 2,
      }}
    >
      {roomName}
    </Typography>
  );
};
export default ChatWindowHeader;
