import jwt from "jsonwebtoken";

import Player from "@/game/player";
import { SocketType } from "#/socket";
import { ClientToServerEventTypes as EventTypes } from "shared/events/types/client-to-server";
import { success, failure } from "shared/response/constructors";
import Room from "@/game/room";

export default function join(socket: SocketType) {
  socket.on(EventTypes.ROOM_JOIN, (PayloadJoinRoom, callback) => {
    const { username, avatar, token, roomId } = PayloadJoinRoom;
    let room: Room | undefined;
    let player: Player | undefined;
    let sendPlayerId: string;

    try {
      // if player joins for the first time
      if (!token) {
        if (!roomId) return;

        room = Room.get(roomId);
        if (!room) throw new Error("Room not found");

        player = new Player(username, avatar);
        sendPlayerId = player.getId();
      } else {
        const { playerId } = jwt.verify(token, process.env.JWT_SECRET!) as {
          playerId: string;
        };
        if (!playerId) throw new Error("Invalid token");

        // if player got kicked
        player = Player.get(playerId);
        if (!player) throw new Error("Player not found");

        sendPlayerId = playerId;
      }

      room = player.getRoom();
      if (!room) throw new Error("Room was not joined");
      socket.join(room.getId());

      const signedPlayerId = jwt.sign({ id: sendPlayerId }, process.env.JWT_SECRET!, {expiresIn: 60 * 60 })

      //TODO: send room context to the client
            callback(
              success({
                signedPlayerId,
                playerData: player.getPlayerData(),
              })
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
