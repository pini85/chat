import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { Message } from "@shared/types";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";
import ChatBubble from "./ChatBubble";

interface ChatMessagesProps {
  isMobile: boolean;
  messages: Message[];
  markMessageAsRead: (messageId: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  isMobile,
  messages,
  markMessageAsRead,
}) => {
  const { user } = useAuthContext();
  const observer = useRef<IntersectionObserver | null>(null);
  const [readMessages, setReadMessages] = useState<Set<string>>(new Set());

  useEffect(() => {
    //todo create a reusable observer
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const messageId = entry.target.getAttribute("data-message-id");
            const messageUser = entry.target.getAttribute("data-message-user");

            if (
              messageId &&
              messageUser !== user?.name &&
              !readMessages.has(messageId)
            ) {
              markMessageAsRead(messageId);
              setReadMessages((prev) => new Set(prev).add(messageId)); // Track this message as read
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => {
      observer.current?.disconnect();
    };
  }, [markMessageAsRead, user, readMessages]);

  useEffect(() => {
    const elements = document.querySelectorAll(".chat-message");
    elements.forEach((element) => observer.current?.observe(element));
    return () => {
      elements.forEach((element) => observer.current?.unobserve(element));
    };
  }, [messages]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        padding: isMobile ? 1 : 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {messages.map((message) => (
        <ChatBubble key={message.id} message={message} isMobile={isMobile} />
      ))}
    </Box>
  );
};

export default ChatMessages;
