import Room from "../room";

const players = new Map<string, Player>();

export default class Player {
  private id: string;

  private username: string;
  private avatar: string;

  private roomId?: string;
  private relatedSockets: Set<string> = new Set();

  constructor(username: string, avatar: string) {
    this.id = crypto.randomUUID();
    players.set(this.id, this);
    this.username = username;
    this.avatar = avatar;
  }

  public getId(): string {
    return this.id;
  }

  public getUsername(): string {
    return this.username;
  }

  public getAvatar(): string {
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
    if (this.relatedSockets.has(socketId)) return;
    this.relatedSockets.add(socketId);
  }

  public logoutSocket(socketId: string) {
    this.relatedSockets.delete(socketId);
  }

  public getRoom(): Room | undefined {
    if (!this.roomId) return undefined;
    return Room.get(this.roomId);
  }

  //! Michel don't fuse createRoom and joinRoom
  public createRoom() {
    if (this.roomId) throw new Error("Player is already in a room");

    const room = new Room();
    room.join(this.id);

    this.roomId = room.getId();
  }

  public joinRoom(roomId: string) {
    const room = Room.get(roomId);
    if (!room) throw new Error("Room not found");
    if (this.roomId === roomId) return;
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

  public static get(id: string): Player | undefined {
    return players.get(id);
  }
}
