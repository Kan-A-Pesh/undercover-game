import Player from "@/game/player";
import { SocketType } from "#/socket";

export default function disconnect(socket: SocketType) {
  socket.on("disconnect", () => {
    Player.get(socket.id)?.leaveRoom();
  });
}
