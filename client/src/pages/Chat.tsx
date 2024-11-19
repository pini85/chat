import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import ChatRoomsList from "@/features/chat/components/ChatRoomList/ChatRoomList";
import ChatParticipants from "@/features/chat/components/ChatParticipants";
import ChatWindow from "@/features/chat/components/ChatWindow/ChatWindow";
import useSocketConnection from "@/features/chat/hooks/useSocketConnection";

export const Chat = () => {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useSocketConnection();

  return (
    <Box
      sx={{
        height: `calc(100dvh - 130px)`,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        overflow: "hidden",
        fontSize: isMobile ? "0.8rem" : "1rem",
      }}
    >
      <Box
        sx={{
          width: isMobile ? "100%" : "250px",
          height: isMobile ? "150px" : "100%",
          borderRight: isMobile ? "none" : "1px solid #e0e0e0",
          borderBottom: isMobile ? "1px solid #e0e0e0" : "none",
          overflowY: "auto",
          flexShrink: 0,
          padding: isMobile ? 1 : 2,
        }}
      >
        <ChatRoomsList
          setSelectedRoom={setSelectedRoom}
          selectedRoom={selectedRoom}
        />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          padding: isMobile ? 1 : 2,
        }}
      >
        <ChatWindow selectedRoom={selectedRoom} isMobile={isMobile} />
      </Box>

      <Box
        sx={{
          width: isMobile ? "100%" : "200px",
          height: isMobile ? "150px" : "100%",
          borderLeft: isMobile ? "none" : "1px solid #e0e0e0",
          overflowY: "auto",
          flexShrink: 0,
          padding: isMobile ? 1 : 2,
        }}
      >
        <ChatParticipants selectedRoom={selectedRoom} />
      </Box>
    </Box>
  );
};
