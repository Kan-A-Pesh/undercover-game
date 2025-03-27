import RoomSettings from "shared/models/room-settings";
import RoomContext from "./room-context";
enum RoomName {
  Setup = "Setup",
  WordAttribution = "WordAttribution",
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
  }

  public startGame = (playerId: string) => {
    if (this.context.isHost(playerId)) {
      this.context.transitionTo(new WordAttributionState());
    }
  };

  public setSettings = (playerId: string, settings: RoomSettings): boolean => {
    if (!this.context.isHost(playerId)) throw new Error("Only host can change settings");
    this.context.setSettings(playerId, settings);
    return true;
  };
}

export class WordAttributionState extends BaseState {
  //TODO: Implement word and role distribution
  //TODO: Display words to players
  constructor() {
    super(RoomName.WordAttribution);
  }

  public distributeWords = () => {};
}
