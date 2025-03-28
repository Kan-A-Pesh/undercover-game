import { SocketType } from "#/socket";
import { ResponseCallback } from "shared/response/callback";
import Player from "@/game/player";
import { success, failure } from "shared/response/constructors";
import { VoteResultsState } from "@/game/room/states/vote-results";
import { RoomName } from "shared/models/room-name";

export default function mrWhiteGuess(socket: SocketType) {
  socket.on("game:results:mr-white-guess", (payload: { word: string }, callback: ResponseCallback<null>) => {
    try {
      const room = Player.get(socket.data.playerId)?.getRoom();

      if (!room) throw new Error("No room/player found");
      if (!room.isHost(socket.data.playerId)) throw new Error("Player is not the host");

      const currentState = room.getCurrentRoomState();

      if (!currentState.is(RoomName.VoteResults)) throw new Error("Cannot guess in this state");
      const state = currentState as VoteResultsState;

      state.onMrWhiteGuess(socket.data.playerId!, payload.word);

      callback(success(null));
    } catch (error) {
      console.error(error);
      callback(failure("An unknown error occurred"));
    }
  });
}
