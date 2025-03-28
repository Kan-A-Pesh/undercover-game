import { SocketType } from "#/socket";
import { ResponseCallback } from "shared/response/callback";
import Player from "@/game/player";
import { success, failure } from "shared/response/constructors";
import { VotingState } from "@/game/room/states/voting";
import { RoomName } from "shared/models/room-name";

export default function vote(socket: SocketType) {
  socket.on("game:voting:vote", (payload: { vote: string }, callback: ResponseCallback<null>) => {
    try {
      const room = Player.get(socket.data.playerId)?.getRoom();

      if (!room) throw new Error("No room/player found");
      if (!room.isHost(socket.data.playerId)) throw new Error("Player is not the host");

      const currentState = room.getCurrentRoomState();

      if (!currentState.is(RoomName.Voting)) throw new Error("Cannot vote in this state");
      const state = currentState as VotingState;

      state.onVote(socket.data.playerId!, payload.vote);

      callback(success(null));
    } catch (error) {
      console.error(error);
      callback(failure("An unknown error occurred"));
    }
  });
}
