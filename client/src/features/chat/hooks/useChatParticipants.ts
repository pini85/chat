import { useEffect, useState } from "react";
import socket from "@/config/sockets";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";

export const useChatParticipants = (selectedRoom: number | null) => {
  const { user } = useAuthContext();
  const [participants, setParticipants] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedRoom || !user) return;

    // Join the room and register user
    socket.emit("joinRoom", { room: selectedRoom, username: user.name });

    // Listen for participant updates
    socket.on("participantsUpdate", (updatedParticipants: string[]) => {
      setParticipants(updatedParticipants);
    });

    return () => {
      // Leave the room on cleanup
      socket.emit("leaveRoom", { room: selectedRoom, username: user.name });
      socket.off("participantsUpdate");
    };
  }, [selectedRoom, user]);

  return participants;
};
