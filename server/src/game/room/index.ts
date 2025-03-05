import { io } from "@/server";
import RoomContext from "./room-context";

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

  public getCurrentRoomState() {
    return this.context.getState();
  }

  public getCurrentRoomInfo() {
    return this.context.getRoomInfo();
  }

  public join(playerId: string): boolean {
    const players = this.context.getPlayers();
    if (players.size > this.context.getMaxPlayer()) return false;
    this.context.addPlayer(playerId);
    console.log("Joining room", playerId);
    return true;
  }

  public leave(playerId: string): boolean {
    const isPlayer = this.context.getPlayers();
    if (!isPlayer.has(playerId)) return false;
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
