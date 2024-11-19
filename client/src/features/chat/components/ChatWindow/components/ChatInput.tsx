import React from "react";
import { Box } from "@mui/material";
import FormInput from "@/components/form/FormInput";
import CustomButton from "@/components/ui/CustomButton/CustomButton";
interface ChatInputProps {
  isMobile: boolean;
  newMessage: string;
  setNewMessage: (value: string) => void;
  handleSendMessage: () => void;
}
const ChatInput: React.FC<ChatInputProps> = ({
  isMobile,
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  return (
    <Box sx={{ display: "flex", gap: isMobile ? 1 : 2, mt: isMobile ? 1 : 2 }}>
      <FormInput
        fullWidth
        value={newMessage}
        placeholder="Type a message"
        handleOnChange={(e) => setNewMessage(e.target.value)}
        sx={{
          fontSize: isMobile ? "0.75rem" : "1rem",
          padding: isMobile ? "4px" : "8px",
        }}
      />
      <CustomButton
        onClick={handleSendMessage}
        disabled={!newMessage.trim()}
        sx={{ fontSize: isMobile ? "0.75rem" : "1rem" }}
      >
        Send
      </CustomButton>
    </Box>
  );
};
export default ChatInput;
