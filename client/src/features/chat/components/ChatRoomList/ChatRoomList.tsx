import React, { useEffect } from "react";
import chatRooms from "../../utils/chatRooms";
import ChatRoom from "./components/ChatRoom";
import { useNavigate, useParams } from "react-router-dom";

import { List, Typography, Box, useTheme } from "@mui/material";

interface ChatRoomsListProps {
  setSelectedRoom: (room: number) => void;
  selectedRoom: number | null;
}

const ChatRoomsList: React.FC<ChatRoomsListProps> = ({
  setSelectedRoom,
  selectedRoom,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  //conver to number
  const roomId = id ? Number(id) : null;

  useEffect(() => {
    if (roomId !== null) {
      setSelectedRoom(roomId);
    }
  }, []);

  const handleRoomSelect = (roomId: number) => {
    setSelectedRoom(roomId);
    navigate(`/chat/${roomId}`);
  };

  return (
    <Box
      sx={{
        padding: theme.spacing(2),
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: theme.spacing(2),
          color: theme.palette.text.secondary,
        }}
      >
        Chat Rooms
      </Typography>
      <List>
        {/* best practice would be to get the chat rooms from the backend as the source of truth */}
        {chatRooms.map((room) => (
          <ChatRoom
            key={room.id}
            id={room.id}
            name={room.name}
            isSelected={selectedRoom === room.id}
            onSelect={handleRoomSelect}
          />
        ))}
      </List>
    </Box>
  );
};

export default ChatRoomsList;
