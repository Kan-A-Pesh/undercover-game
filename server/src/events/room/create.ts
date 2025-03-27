import jwt from "jsonwebtoken";

import Player from "@/game/player";
import { SocketType } from "#/socket";
import { ClientToServerEventTypes as EventTypes } from "shared/events/types/client-to-server";
import { success, failure } from "shared/response/constructors";

export default function createOrJoin(socket: SocketType) {
  socket.on(EventTypes.ROOM_CREATE, (payload, callback) => {
    const { username, avatar } = payload;

    try {
      // if username or avatar is missing, return
      if (!username || !avatar) throw new Error("Username or avatar is missing");

      // Check if user is already in a room
      if (socket.data.playerId && Player.get(socket.data.playerId)) throw new Error("User is already in a room");

      const player = new Player(username, avatar);
      player.createOrJoinRoom();

      const room = player.getRoom();
      if (!room) throw new Error("Room not found");

      socket.join(room.getId());

      // Link the player to the socket
      player.loginSocket(socket.id);
      socket.data.playerId = player.getId();

      const signedPlayerId = jwt.sign({ id: player.getId() }, process.env.JWT_SECRET!, { expiresIn: 60 * 60 });

      callback(
        success({
          signedPlayerId,
          playerData: player.getPlayerData(),
          gameSettings: player.getRoom()!.getCurrentRoomInfo(),
          roomId: room.getId(),
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
