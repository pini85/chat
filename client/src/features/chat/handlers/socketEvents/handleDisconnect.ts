import socket from "@/config/sockets";

const handleDisconnect = () => {
  socket.disconnect();
};

export default handleDisconnect;
