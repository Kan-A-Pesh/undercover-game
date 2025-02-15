import { BaseState, SetupState } from "./roomState";
import { Settings } from "shared/models/settings";

export default class RoomContext {
  private state: BaseState;
  private settings: Settings;

  constructor() {
    this.state = new SetupState();
    this.settings = {
      players: new Set<string>(),
      maxPlayer: 10,
      mrWhiteCount: 1,
      agentCount: 2,
      wordAttribution: 60,
      wordChoosingDuration: 60,
      debateDuration: 60,
      votingDuration: 60,
    };
  }

  public getState(): BaseState {
    return this.state;
  }

  public getPlayers(): Set<string> {
    return this.settings.players;
  }

  public addPlayer(player: string) {
    this.settings.players.add(player);
  }

  public removePlayer(player: string) {
    this.settings.players.delete(player);
  }

  public getRoomInfo(): Settings {
    return this.settings;
  }

  public transitionTo(state: BaseState) {
    this.state = state;
    state.setContext(this);
  }
}
