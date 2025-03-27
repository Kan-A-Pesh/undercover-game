import RoomCreatePayload from "shared/payloads/room-create";
import RoomJoinPayload from "shared/payloads/room-join";
import { ClientToServerEventTypes as EventTypes } from "shared/events/types/client-to-server";
import { ResponseCallback } from "shared/response/callback";
import PlayerData from "shared/models/player-data";
import RoomSettings from "shared/models/room-settings";

type ClientToServerEvents = {
    [EventTypes.ROOM_CREATE]: (
        payload: RoomCreatePayload,
        callback: ResponseCallback<{
            signedPlayerId: string;
            playerData: PlayerData;
        }>
    ) => void;

    [EventTypes.ROOM_JOIN]: (
        payload: RoomJoinPayload,
        callback: ResponseCallback<{
            signedPlayerId: string;
            playerData: PlayerData;
            gameSettings?: RoomSettings;
        }>
    ) => void;
};

export default ClientToServerEvents;
