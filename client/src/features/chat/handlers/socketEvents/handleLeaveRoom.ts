import socket from "@/config/sockets";

const handleLeaveRoom = (
  selectedRoom: number | null,
  username: string | null
) => {
  if (!selectedRoom || !username) return;

  socket.emit("leaveRoom", { room: selectedRoom, username });
};

export default handleLeaveRoom;
