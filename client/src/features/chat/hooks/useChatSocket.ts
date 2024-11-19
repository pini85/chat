import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import socket from "@/config/sockets";
import handleNewMessage from "@/features/chat/handlers/socketEvents/handleNewMessage";
import handleUpdateMessageStatus from "@/features/chat/handlers/socketEvents/handleUpdateMessageStatus";
import handleJoinRoom from "@/features/chat/handlers/socketEvents/handleJoinRoom";
import handleLeaveRoom from "@/features/chat/handlers/socketEvents/handleLeaveRoom";
import handleDisconnect from "@/features/chat/handlers/socketEvents/handleDisconnect";
import { mergeMessages } from "@/features/chat/utils/mergeMessages";
import { Message } from "@shared/types";

interface UseChatSocketProps {
  selectedRoom: number | null;
  user: { name: string } | null;
  initialMessages: Message[];
}

export const useChatSocket = ({
  selectedRoom,
  user,
  initialMessages,
}: UseChatSocketProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!selectedRoom || !user) return;

    const queryKey = ["chatMessages", selectedRoom];
    const cachedMessages = queryClient.getQueryData<Message[]>(queryKey) || [];
    const mergedMessages = mergeMessages(cachedMessages, initialMessages);

    setMessages(mergedMessages);
    queryClient.setQueryData(queryKey, mergedMessages);

    socket.connect();
    handleJoinRoom(selectedRoom, user.name);

    const newMessageHandler = (message: Message) =>
      handleNewMessage(message, setMessages, queryClient, queryKey);
    const messageStatusHandler = (payload: any) =>
      handleUpdateMessageStatus(payload, setMessages, queryClient, queryKey);

    socket.on("message", newMessageHandler);
    socket.on("updateMessageStatus", messageStatusHandler);

    return () => {
      handleLeaveRoom(selectedRoom, user.name);
      socket.off("message", newMessageHandler);
      socket.off("updateMessageStatus", messageStatusHandler);
      handleDisconnect();
    };
  }, [selectedRoom, user, queryClient, initialMessages]);

  const sendMessage = (content: string) => {
    if (!selectedRoom || !user) return;

    const message: Message = {
      id: crypto.randomUUID(),
      user: user.name,
      content,
      timestamp: new Date().toISOString(),
      readBy: [user.name],
      allRead: false,
    };

    setMessages((prev) => [...prev, message]);
    queryClient.setQueryData<Message[]>(
      ["chatMessages", selectedRoom],
      (prev = []) => [...prev, message]
    );

    socket.emit("message", { room: selectedRoom, message });
  };

  const markMessageAsRead = (messageId: string) => {
    if (!selectedRoom || !user) return;

    socket.emit("readMessage", {
      room: selectedRoom,
      messageId,
      username: user.name,
    });
  };

  return { messages, sendMessage, markMessageAsRead };
};
