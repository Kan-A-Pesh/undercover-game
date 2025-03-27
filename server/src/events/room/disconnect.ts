import Player from "@/game/player";
import { SocketType } from "#/socket";

export default function disconnect(socket: SocketType) {
  socket.on("disconnect", () => {
    try {
      // Logout the player if they are logged in
      if (!socket.data.playerId) return;
      Player.get(socket.data.playerId)?.logoutSocket();
    } catch (error) {
      console.error(error);
    }
  });
}
