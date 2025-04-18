import { DefaultEventsMap, Server } from "socket.io";
import ClientToServerEvents from "shared/events/client-to-server";
import ServerToClientEvents from "shared/events/server-to-client";
import SocketData from "#/socket-data";

export const io = new Server<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, SocketData>({
  serveClient: false,
});
