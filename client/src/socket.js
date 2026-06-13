import { io } from "socket.io-client";

export const socket = io(
  "https://auction-centrall-backend.onrender.com",
  {
    withCredentials: true,
    transports: ["websocket", "polling"],
  }
);