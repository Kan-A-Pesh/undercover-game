import { BaseState, SetupState } from "./room-state";
import RoomSettings from "shared/models/room-settings";

export default class RoomContext {
  private state: BaseState;
  private settings: RoomSettings;
  private hostId: string | null = null;
  private players: Set<string>; // All playerIds
  private spectators: Set<string>;

  constructor() {
    this.state = new SetupState();
    this.players = new Set<string>();
    this.spectators = new Set<string>();
    this.settings = {
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

  public getMaxPlayer(): number {
    return this.settings.maxPlayer;
  }

  public getPlayers(): Set<string> {
    return this.players;
  }

  public addPlayer(player: string) {
    this.players.add(player);
  }

  public removePlayer(player: string) {
    this.players.delete(player);
  }

  public getRoomInfo(): RoomSettings {
    return this.settings;
  }

  public setSettings(playerId: string, settings: RoomSettings) {
    if (!this.isHost(playerId)) return;
    this.settings = settings;
  }

  public transitionTo(state: BaseState) {
    this.state = state;
    state.setContext(this);
  }

  public isHost(playerId: string): boolean {
    return this.hostId === playerId;
  }

}
