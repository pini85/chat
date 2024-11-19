import { useQuery } from "@tanstack/react-query";
import { fetchMessagesByRoom } from "@/features/chat/services/chatService";

const useRoomMessages = (roomId: number | null) => {
  return useQuery({
    queryKey: ["chatMessages", roomId],
    queryFn: () => (roomId ? fetchMessagesByRoom(roomId.toString()) : []),
    enabled: !!roomId,
    staleTime: 0,
  });
};

export default useRoomMessages;
