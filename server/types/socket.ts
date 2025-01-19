import ClientToServerEvents from "shared/events/client-to-server";
import ServerToClientEvents from "shared/events/server-to-client";
import { Socket, DefaultEventsMap } from "socket.io";
import SocketData from "./socket-data";

export type SocketType = Socket<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, SocketData>;
