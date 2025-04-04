import RoomContext from "./room-context";
import { RoomName } from "shared/models/room-name";

export abstract class BaseState {
  public readonly name: RoomName = RoomName.Unknown;
  protected context!: RoomContext;

  public setContext(context: RoomContext) {
    this.context = context;
  }

  public abstract onTransition(): void;

  public abstract getStateDuration(): number | undefined;

  public is(name: RoomName) {
    return this.name === name;
  }
}
