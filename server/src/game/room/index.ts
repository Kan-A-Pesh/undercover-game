import { io } from "@/server";
import RoomContext from "./roomContext";

const rooms = new Map<string, Room>();

export default class Room {
  private id: string;
  private context: RoomContext = new RoomContext();

  constructor() {
    this.id = crypto.randomUUID();
    rooms.set(this.id, this);
  }

  public getId() {
    return this.id;
  }

  public join(playerId: string): boolean {
    const players = this.context.getPlayers();
    if (players.has(playerId)) return false;
    this.context.addPlayer(playerId);
    console.log("Joining room", playerId);
    return true;
  }

  public leave(playerId: string) {
    const players = this.context.getPlayers();
    if (!players.has(playerId)) return false;
    this.context.removePlayer(playerId);
    console.log("Leaving room", playerId);
    return true;
  }

  public getIo() {
    return io.to(this.id);
  }

  static get(id: string) {
    return rooms.get(id);
  }
}
