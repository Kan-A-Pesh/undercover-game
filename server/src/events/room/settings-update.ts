import Player from "@/game/player";
import { SocketType } from "#/socket";
import { ResponseCallback } from "shared/response/callback";
import { success, failure } from "shared/response/constructors";
import RoomSettings from "shared/models/room-settings";
import { RoomName } from "@/game/room/room-state";
import { SetupState } from "@/game/room/states/setup";

export default function settingsUpdate(socket: SocketType) {
  socket.on("room:settings:update", (payload: Partial<RoomSettings>, callback: ResponseCallback<null>) => {
    try {
      const room = Player.get(socket.data.playerId)?.getRoom();

      if (!room) throw new Error("No room/player found");
      if (!room.isHost(socket.data.playerId)) throw new Error("Player is not the host");

      const currentState = room.getCurrentRoomState();

      if (!currentState.is(RoomName.Setup)) throw new Error("Cannot update settings in this state");
      const state = currentState as SetupState;

      const settings = state.getSettings();
      state.setSettings({ ...settings, ...payload });

      callback(success(null));
    } catch (error) {
      console.error(error);
      callback(failure("An unknown error occurred"));
    }
  });
}
