import PlayerData from "shared/models/player-data";
import RoomCreatePayload from "shared/payloads/room-create";
import RoomJoinPayload from "shared/payloads/room-join";
import { ClientToServerEventTypes as EventTypes } from "shared/events/types/client-to-server";

type ResponseCallback = (response: PlayerData | string) => void;

type ClientToServerEvents = {
    [EventTypes.PLAYER_AUTH]: (token: string | null, callback: ResponseCallback) => void;
    [EventTypes.ROOM_CREATE]: (
        payload: RoomCreatePayload,
        callback: ResponseCallback
    ) => void;
    [EventTypes.ROOM_JOIN]: (payload: RoomJoinPayload, callback: ResponseCallback) => void;
};

export default ClientToServerEvents;
