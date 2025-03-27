import jwt from "jsonwebtoken";

import Player from "@/game/player";
import { SocketType } from "#/socket";
import { ClientToServerEventTypes as EventTypes } from "shared/events/types/client-to-server";
import { success, failure } from "shared/response/constructors";

export default function create(socket: SocketType) {
  socket.on(EventTypes.ROOM_CREATE, (payload, callback) => {
    const { username, avatar } = payload;

    try {
      //TODO: fix socket can create multiple rooms
      const player = new Player(username, avatar);
      player.createRoom();

      const room = player.getRoom();
      if (!room) throw new Error("Room not found");

      socket.join(room.getId());

      const signedPlayerId = jwt.sign({ id: player.getId() }, process.env.JWT_SECRET!, { expiresIn: 60 * 60 });

      //TODO: send room context to the client
      callback(
        success({
          signedPlayerId,
          playerData: player.getPlayerData(),
        }),
      );
    } catch (error) {
      if (error instanceof Error) {
        callback(failure(error.message));
      } else {
        callback(failure("An unknown error occurred"));
      }

      console.error(error);
    }
  });
}
