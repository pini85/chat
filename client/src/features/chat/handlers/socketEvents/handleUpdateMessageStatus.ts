import { QueryClient } from "@tanstack/react-query";
import { Message } from "@shared/types";

const handleUpdateMessageStatus = (
  payload: { messageId: string; readBy: string[]; allRead: boolean },
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  queryClient: QueryClient,
  queryKey: any
) => {
  const { messageId, readBy, allRead } = payload;

  setMessages((prev) =>
    prev.map((msg) =>
      msg.id === messageId ? { ...msg, readBy, allRead } : msg
    )
  );

  queryClient.setQueryData<Message[]>(queryKey, (prev = []) => {
    const prevMessages = prev as Message[];
    return prevMessages.map((msg) =>
      msg.id === messageId ? { ...msg, readBy, allRead } : msg
    );
  });
};

export default handleUpdateMessageStatus;
