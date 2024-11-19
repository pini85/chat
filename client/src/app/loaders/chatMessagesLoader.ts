import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs, defer } from "react-router-dom";
import { fetchMessagesByRoom } from "@/features/chat/services/chatService";

export const chatMessagesLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { id } = params as { id: string };

    if (!id) throw new Error("Room ID is required");
    const roomId = Number(id);

    const queryKey = ["chatMessages", roomId];
    const queryFn = () => fetchMessagesByRoom(id);

    const messagesData =
      queryClient.getQueryData(queryKey) ??
      (await queryClient.fetchQuery({ queryKey, queryFn }));

    return defer({
      messages: messagesData,
    });
  };
