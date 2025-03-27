import { io } from "@/server";
import RoomContext from "./room-context";

const rooms = new Map<string, Room>();

export default class Room {
  private id: string;
  private context: RoomContext = new RoomContext();

  constructor() {
    this.id = crypto.randomUUID().substring(0, 6).toLocaleUpperCase();
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
    return this.context.addPlayer(playerId);
  }

  public leave(playerId: string): boolean {
    console.log("Player:", playerId, "has left room:", this.id);
    return this.context.removePlayer(playerId);
  }

  public getIo() {
    return io.to(this.id);
  }

  static get(id: string) {
    return rooms.get(id);
  }
}
