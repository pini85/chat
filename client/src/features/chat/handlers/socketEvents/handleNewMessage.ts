import { QueryClient } from "@tanstack/react-query";
import { Message } from "@shared/types";

const handleNewMessage = (
  message: Message,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  queryClient: QueryClient,
  queryKey: any
) => {
  setMessages((prev) => {
    if (prev.some((msg) => msg.id === message.id)) return prev;
    return [...prev, message];
  });

  queryClient.setQueryData<Message[]>(queryKey, (prev = []) => {
    if (prev.some((msg) => msg.id === message.id)) return prev;
    return [...prev, message];
  });
};

export default handleNewMessage;
