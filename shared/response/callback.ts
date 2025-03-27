import PlayerData from "../models/player-data";
import { Response } from ".";
import RoomSettings from "../models/room-settings";

export type ResponseCallback<T> = (response: Response<T>) => void;

export type JoinResponseCallback = {
  signedPlayerId: string;
  playerData: PlayerData;
  roomId: string;
  gameSettings: RoomSettings;
};
