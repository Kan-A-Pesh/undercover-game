import { SocketType } from "#/socket";
import Player from "@/game/player";
import jwt from "jsonwebtoken";
import PlayerData from "shared/models/player-data";
import {ClientToServerEventTypes as EventTypes} from "shared/events/types/client-to-server";


export default function auth(socket: SocketType) {
  socket.on(EventTypes.PLAYER_AUTH, (token, callback) => {
    try {
      if (!token) return;

      const { playerId } = jwt.verify(token, process.env.JWT_SECRET!) as {
        playerId: string;
      };
      if (!playerId) throw new Error("Invalid token");

      const player = Player.get(playerId);
      if (!player) throw new Error("Player not found");

      const room = player.getRoom();
      if (!room) throw new Error("Room not found");

      socket.join(room.getId());

      const PlayerData: PlayerData = {
        username: player.getUsername(),
        avatar: player.getAvatar(),
      };

      //TODO: send player and room contexts to the client
      callback(PlayerData);
    } catch (error) {
      if (error instanceof Error) {
        callback(error.message);
      } else {
        callback("An unknown error occurred");
      }

      console.error(error);
    }
  });
}
