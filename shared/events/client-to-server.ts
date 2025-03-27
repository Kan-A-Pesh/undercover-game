import RoomCreatePayload from "../payloads/room-create";
import RoomJoinPayload from "../payloads/room-join";
import { ClientToServerEventTypes as EventTypes } from "../events/types/client-to-server";
import {
    JoinResponseCallback,
    ResponseCallback,
} from "../response/callback";

type ClientToServerEvents = {
    [EventTypes.ROOM_CREATE]: (
        payload: RoomCreatePayload,
        callback: ResponseCallback<JoinResponseCallback>
    ) => void;

    [EventTypes.ROOM_JOIN]: (
        payload: RoomJoinPayload,
        callback: ResponseCallback<JoinResponseCallback>
    ) => void;
};

export default ClientToServerEvents;
