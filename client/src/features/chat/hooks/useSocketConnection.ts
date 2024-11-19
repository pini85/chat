import { useEffect } from "react";
import socket from "@/config/sockets";
const useSocketConnection = () => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      console.log("IM DISCONNECTING");
      socket.disconnect();
    };
  }, []);
};
export default useSocketConnection;
