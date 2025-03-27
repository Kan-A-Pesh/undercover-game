import PlayerData from "shared/models/player-data";
import Room from "../room";
import { io } from "@/server";

const players = new Map<string, Player>();

export default class Player {
  private id: string;
  private playerData: PlayerData;

  private roomId?: string;
  private relatedSocketId?: string;

  constructor(username: string, avatar: string) {
    this.id = crypto.randomUUID();
    this.playerData = { username, avatar };
    players.set(this.id, this);
  }

  public getId(): string {
    return this.id;
  }

  public getPlayerData(): PlayerData {
    return this.playerData;
  }

  public setUsername(username: string) {
    this.playerData.username = username;
    this.getRoom()?.getIo().emit("update:player:username", this.id, username);
  }

  public setAvatar(avatar: string) {
    this.playerData.avatar = avatar;
    this.getRoom()?.getIo().emit("update:player:avatar", this.id, avatar);
  }

  public loginSocket(socketId: string) {
    if (this.relatedSocketId) {
      // Logout the player from the old socket
      io.sockets.sockets.get(this.relatedSocketId)?.leave(this.roomId ?? "");
    }

    this.relatedSocketId = socketId;
  }

  public logoutSocket() {
    this.relatedSocketId = undefined;
  }

  public getRoom(): Room | undefined {
    if (!this.roomId) return undefined;
    return Room.get(this.roomId);
  }

  public createOrJoinRoom(roomId?: string) {
    if (this.roomId) throw new Error("Player is already in a room");

    let room: Room | undefined;

    if (roomId) {
      // Join existing room
      room = Room.get(roomId);
      if (!room) throw new Error("Room not found");
      if (!room.join(this.id)) throw new Error("Room is full and no spectator allowed");
    } else {
      // Create new room
      room = new Room();
      room.join(this.id);
    }

    this.roomId = room.getId();
  }

  public leaveRoom() {
    if (!this.roomId) throw new Error("Player is not in a room");

    const room = Room.get(this.roomId);
    if (!room) throw new Error("Room not found");
    if (!room.leave(this.id)) throw new Error("Cannot leave room");

    this.roomId = undefined;
  }

  public static get(id: string): Player | undefined {
    return players.get(id);
  }
}
