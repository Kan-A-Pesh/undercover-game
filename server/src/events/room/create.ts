import Player from "@/game/player";
import { SocketType } from "#/socket";
import PlayerData from "shared/models/player-data";
import {ClientToServerEventTypes as EventTypes} from "shared/events/types/client-to-server";

export default function create(socket: SocketType) {
  socket.on(EventTypes.ROOM_CREATE, (payload, callback) => {
    const { username, avatar } = payload;

    try {
      const player = new Player(username, avatar);
      player.createRoom();

      const room = player.getRoom();
      if (!room) throw new Error("Room not found");

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
