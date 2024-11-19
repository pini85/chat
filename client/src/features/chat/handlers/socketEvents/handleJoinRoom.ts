import socket from "@/config/sockets";

const handleJoinRoom = (
  selectedRoom: number | null,
  username: string | null
) => {
  if (!selectedRoom || !username) return;

  socket.emit("joinRoom", { room: selectedRoom, username });
};

export default handleJoinRoom;
