import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs, defer } from "react-router-dom";

export const fetchMessagesByRoom = async (roomId: string): Promise<any[]> => {
  const response = await fetch(`/api/messages/${roomId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }
  return response.json();
};

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
