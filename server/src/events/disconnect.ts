import Player from "../player";
import { SocketType } from "@/types/socket";

export default function disconnect(socket: SocketType) {
  socket.on("disconnect", () => {
    Player.get(socket.id)?.leaveRoom();
  });
}
