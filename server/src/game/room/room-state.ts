import RoomContext from "./room-context";
enum RoomName {
  Setup = "Setup"
}

export abstract class BaseState {
  protected name: RoomName;
  protected context!: RoomContext;

  constructor(name: RoomName) {
    this.name = name;
  }
  public setContext(context: RoomContext) {
    this.context = context;
  }
}

export class SetupState extends BaseState {
  constructor() {
    super(RoomName.Setup);
}};