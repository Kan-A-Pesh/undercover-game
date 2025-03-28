import { io } from "@/server";
import RoomContext from "./room-context";

const rooms = new Map<string, Room>();

export default class Room {
  private id: string;
  private context: RoomContext;

  constructor() {
    this.id = crypto.randomUUID().substring(0, 6).toLocaleUpperCase();
    this.context = new RoomContext(this);
    rooms.set(this.id, this);
  }

  public getId() {
    return this.id;
  }

  public getCurrentRoomState() {
    return this.context.getState();
  }

  public getCurrentRoomInfo() {
    return this.context.getRoomInfo();
  }

  public join(playerId: string): boolean {
    console.log("Player:", playerId, "has joined room:", this.id);
    this.getIo().emit("room:players:updated", this.context.getPlayerProfiles());
    return this.context.addPlayer(playerId);
  }

  public leave(playerId: string): boolean {
    console.log("Player:", playerId, "has left room:", this.id);
    this.getIo().emit("room:players:updated", this.context.getPlayerProfiles());
    return this.context.removePlayer(playerId);
  }

  public isHost(playerId?: string): boolean {
    if (!playerId) return false;
    return this.context.isHost(playerId);
  }

  public getIo() {
    return io.to(this.id);
  }

  static get(id: string) {
    return rooms.get(id);
  }
}
