import { io } from "../server";

const rooms = new Map<string, Room>();

export default class Room {
  id: string;
  players: string[] = [];

  constructor() {
    this.id = crypto.randomUUID();
    rooms.set(this.id, this);
  }

  public getId() {
    return this.id;
  }

  public join(id: string) {
    return false;
  }

  public leave(id: string) {
    return false;
  }

  public getIo() {
    return io.to(this.id);
  }

  static get(id: string) {
    return rooms.get(id);
  }
}
