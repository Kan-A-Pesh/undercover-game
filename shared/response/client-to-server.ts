import { Response } from ".";
import PlayerData from "../models/player-data";
import RoomSettings from "../models/room-settings";

export type JoinResponse = Response<{
    playerSettings: PlayerData;
    gameSettings?: RoomSettings;
}>;

export type SettingUpdateResponse = Response<Partial<RoomSettings>>;
