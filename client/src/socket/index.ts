import { io, Socket } from "socket.io-client";
import ClientToServerEvents from "#/events/client-to-server";
import ServerToClientEvents from "#/events/server-to-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(socketUrl);

export default socket;
