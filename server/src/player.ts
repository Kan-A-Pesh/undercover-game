import Room from "./room";

const players = new Map<string, Player>();

export default class Player {
  private id: string;

  private username?: string;
  private avatar?: string;

  private roomId?: string;
  private relatedSockets: Set<string> = new Set();

  constructor() {
    this.id = crypto.randomUUID();
    players.set(this.id, this);
  }

  public getId() {
    return this.id;
  }

  public getRoom() {
    if (!this.roomId) return undefined;
    return Room.get(this.roomId);
  }

  public getUsername() {
    return this.username;
  }

  public getAvatar() {
    return this.avatar;
  }

  public setUsername(username: string) {
    this.username = username;
    this.getRoom()?.getIo().emit("update:player:username", this.id, username);
  }

  public setAvatar(avatar: string) {
    this.avatar = avatar;
    this.getRoom()?.getIo().emit("update:player:avatar", this.id, avatar);
  }

  public loginSocket(socketId: string) {
    this.relatedSockets.add(socketId);
  }

  public logoutSocket(socketId: string) {
    this.relatedSockets.delete(socketId);

    if (this.relatedSockets.size === 0) {
      if (this.roomId) this.leaveRoom();
      players.delete(this.id);
    }
  }

  public joinRoom(roomId: string) {
    const room = Room.get(roomId);
    if (!room) throw new Error("Room not found");
    if (!room.join(this.id)) throw new Error("Room is full");

    this.roomId = roomId;
  }

  public leaveRoom() {
    if (!this.roomId) throw new Error("Player is not in a room");

    const room = Room.get(this.roomId);
    if (!room) throw new Error("Room not found");
    if (!room.leave(this.id)) throw new Error("Cannot leave room");

    this.roomId = undefined;
  }

  public static get(id: string) {
    return players.get(id);
  }
}
