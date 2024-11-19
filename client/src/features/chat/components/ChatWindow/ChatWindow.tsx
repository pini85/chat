import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Box } from "@mui/material";

import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";
import { useChatSocket } from "@/features/chat/hooks/useChatSocket";
import { ChatWindowProps } from "@/features/chat/types";
import { Message } from "@shared/types";

import ChatWindowHeader from "./components/ChatWindowHeader";
import ChatMessages from "@/features/chat/components/ChatWindow/components/ChatMessages";
import ChatInput from "./components/ChatInput";

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedRoom, isMobile }) => {
  const loaderData = useLoaderData() as { messages?: Message[] } | undefined;

  const initialMessages = loaderData?.messages || [];

  const [newMessage, setNewMessage] = useState("");

  const { user } = useAuthContext();

  const { messages, sendMessage, markMessageAsRead } = useChatSocket({
    selectedRoom,
    user,
    initialMessages,
  });

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <ChatWindowHeader isMobile={isMobile} selectedRoom={selectedRoom} />
      <ChatMessages
        isMobile={isMobile}
        messages={messages}
        markMessageAsRead={markMessageAsRead}
      />
      {selectedRoom && (
        <ChatInput
          isMobile={isMobile}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      )}
    </Box>
  );
};

export default ChatWindow;
