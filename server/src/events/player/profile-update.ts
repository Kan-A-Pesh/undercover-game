import Player from "@/game/player";
import { SocketType } from "#/socket";
import { PlayerProfile } from "shared/models/player-profile";
import { ResponseCallback } from "shared/response/callback";
import { success, failure } from "shared/response/constructors";

export default function profileUpdate(socket: SocketType) {
  socket.on("player:profile:update", (payload: PlayerProfile, callback: ResponseCallback<null>) => {
    try {
      // Logout the player if they are logged in
      if (!socket.data.playerId) return;
      Player.get(socket.data.playerId)?.setProfile(payload);
      callback(success(null));
    } catch (error) {
      console.error(error);
      callback(failure("An unknown error occurred"));
    }
  });
}
