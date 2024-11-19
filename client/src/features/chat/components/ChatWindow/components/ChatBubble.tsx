import React from "react";
import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Message } from "@shared/types";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";

interface ChatBubbleProps {
  message: Message;
  isMobile: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isMobile }) => {
  const { user } = useAuthContext();

  const isUserMessage = message.user === user?.name;

  return (
    <Box
      className="chat-message"
      data-message-id={message.id}
      data-message-user={message.user}
      sx={{
        alignSelf: isUserMessage ? "flex-end" : "flex-start",
        backgroundColor: isUserMessage ? "#90caf9" : "#f5f5f5",
        color: isUserMessage ? "#fff" : "#000",
        padding: isMobile ? "4px 8px" : "8px 16px",
        borderRadius: 8,
        marginBottom: isMobile ? 1 : 2,
        maxWidth: "70%",
      }}
    >
      <Typography
        variant="body2"
        sx={{ fontSize: isMobile ? "0.75rem" : "1rem" }}
      >
        {message.user}: {message.content}
      </Typography>
      {isUserMessage && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "4px",
          }}
        >
          {message.allRead ? (
            <>
              <CheckIcon fontSize="small" sx={{ color: "blue" }} />
              <CheckIcon fontSize="small" sx={{ color: "blue" }} />
            </>
          ) : (
            <CheckIcon fontSize="small" sx={{ color: "gray" }} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default ChatBubble;
