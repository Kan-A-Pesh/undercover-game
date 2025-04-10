import RoomSettings from "shared/models/room-settings";
import RoomCreatePayload from "../payloads/room-create";
import RoomJoinPayload from "../payloads/room-join";
import { JoinResponseCallback, ResponseCallback } from "../response/callback";
import { PlayerProfile } from "shared/models/player-profile";

type ClientToServerEvents = {
  "room:create": (
    payload: RoomCreatePayload,
    callback: ResponseCallback<JoinResponseCallback>
  ) => void;

  "room:join": (
    payload: RoomJoinPayload,
    callback: ResponseCallback<JoinResponseCallback>
  ) => void;

  "room:settings:update": (
    payload: Partial<RoomSettings>,
    callback: ResponseCallback<null>
  ) => void;

  "player:profile:update": (
    payload: Omit<PlayerProfile, "id">,
    callback: ResponseCallback<null>
  ) => void;

  "game:setup:start": (payload: null, callback: ResponseCallback<null>) => void;

  "game:results:mr-white-guess": (
    payload: {
      word: string;
    },
    callback: ResponseCallback<null>
  ) => void;

  "game:voting:vote": (
    payload: {
      vote: string;
    },
    callback: ResponseCallback<null>
  ) => void;

  "game:word:choose": (
    payload: {
      word: string;
    },
    callback: ResponseCallback<null>
  ) => void;
};

export default ClientToServerEvents;
