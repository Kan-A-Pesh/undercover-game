import PlayerData from "shared/models/player-data";
import Room from "../room";
import { io } from "@/server";
import { PlayerProfile } from "shared/models/player-profile";

const players = new Map<string, Player>();

export default class Player {
  private id: string;
  private profile: PlayerProfile;
  private playerData: PlayerData;
  private isAlive: boolean;

  private roomId?: string;
  private relatedSocketId?: string;

  constructor(username: string, avatar: string) {
    this.id = crypto.randomUUID();
    this.profile = { id: this.id, username, avatar };
    this.playerData = {};
    this.isAlive = true;

    players.set(this.id, this);
  }

  public getAliveStatus() {
    return this.isAlive;
  }

  public kill() {
    this.isAlive = false;
  }

  public getId(): string {
    return this.id;
  }

  public getIo() {
    if (!this.relatedSocketId) throw new Error("Player is not logged in");
    return io.sockets.sockets.get(this.relatedSocketId);
  }

  public getPlayerData(): PlayerData {
    return this.playerData;
  }

  public setPlayerData(playerData: Partial<PlayerData>) {
    this.playerData = { ...this.playerData, ...playerData };
  }

  public getProfile(): PlayerProfile {
    return this.profile;
  }

  public setProfile(profile: PlayerProfile) {
    this.profile = profile;
    this.getRoom()?.getIo().emit("player:profile:updated", this.id, profile);
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

  public static get(id?: string): Player | undefined {
    if (!id) return undefined;
    return players.get(id);
  }

  public static getMultiple(ids: string[]): Player[] {
    return ids.map((id) => Player.get(id)).filter((player) => player !== undefined) as Player[];
  }
}
