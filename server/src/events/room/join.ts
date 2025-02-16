import Player from "@/game/player";
import { SocketType } from "#/socket";
import jwt from "jsonwebtoken";
import PlayerData from "shared/models/player-data";
import {ClientToServerEventTypes as EventTypes} from "shared/events/types/client-to-server";

export default function join(socket: SocketType) {
  socket.on(EventTypes.ROOM_JOIN, (PayloadJoinRoom, callback) => {
    const { username, avatar, token, roomId } = PayloadJoinRoom;
    if (!token) return;

    try {
      const { playerId } = jwt.verify(token, process.env.JWT_SECRET!) as {
        playerId: string;
      };
      if (!playerId) throw new Error("Invalid token");

      const player = Player.get(playerId);
      if (!player) throw new Error("Player not found");

      player.joinRoom(roomId);
      player.loginSocket(socket.id);

      const room = player.getRoom();
      if (!room) throw new Error("Room was not joined");
      socket.join(room.getId());

      const playerData: PlayerData = {
        username: player.getUsername(),
        avatar: player.getAvatar(),
      };

      //TODO: send player and room contexts to the client
      callback(playerData);
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
