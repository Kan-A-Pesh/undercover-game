import { SocketType } from "#/socket";
import { ResponseCallback } from "shared/response/callback";
import Player from "@/game/player";
import { success, failure } from "shared/response/constructors";
import { WordChoosingState } from "@/game/room/states/word-choosing";
import { RoomName } from "shared/models/room-name";

export default function choose(socket: SocketType) {
  socket.on("game:word:choose", (payload: { word: string }, callback: ResponseCallback<null>) => {
    try {
      const room = Player.get(socket.data.playerId)?.getRoom();

      if (!room) throw new Error("No room/player found");
      const currentState = room.getCurrentRoomState();

      if (!currentState.is(RoomName.WordChoosing)) throw new Error("Cannot choose word in this state");
      const state = currentState as WordChoosingState;

      state.onWordChosen(socket.data.playerId!, payload.word);

      callback(success(null));
    } catch (error) {
      console.error(error);
      callback(failure("An unknown error occurred"));
    }
  });
}
