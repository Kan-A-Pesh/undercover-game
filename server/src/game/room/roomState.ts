import RoomContext from "./roomContext";
type RoomName = "Setup" | "WordDistribution" | "Vote";

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
    super("Setup");
}};