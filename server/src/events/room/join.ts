import jwt from "jsonwebtoken";

import Player from "@/game/player";
import { SocketType } from "#/socket";
import { success, failure } from "shared/response/constructors";
import Room from "@/game/room";

export default function join(socket: SocketType) {
  socket.on("room:join", (PayloadJoinRoom, callback) => {
    const { username, avatar, token, roomId } = PayloadJoinRoom;

    let player: Player | undefined;
    let sendPlayerId: string;

    try {
      // TODO: Add zod validation
      // if username or avatar is missing, return
      if (!username || !avatar) throw new Error("Username or avatar is missing");

      // Check if user is already in a room
      if (socket.data.playerId && Player.get(socket.data.playerId)) throw new Error("User is already in a room");

      // if player joins for the first time
      if (!token) {
        if (!roomId) throw new Error("Room ID is missing");

        const room = Room.get(roomId);
        if (!room) throw new Error("Room not found");

        player = new Player(username, avatar);
        player.createOrJoinRoom(room.getId());
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

      const checkRoom = player.getRoom();
      if (!checkRoom) throw new Error("Room was not joined");

      socket.join(checkRoom.getId());

      // Link the player to the socket
      player.loginSocket(socket.id);
      socket.data.playerId = player.getId();

      const signedPlayerId = jwt.sign({ playerId: sendPlayerId }, process.env.JWT_SECRET!, { expiresIn: 60 * 60 });

      callback(
        success({
          signedPlayerId,
          playerData: player.getPlayerData(),
          gameSettings: player.getRoom()!.getCurrentRoomInfo(),
          roomId: checkRoom.getId(),
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
