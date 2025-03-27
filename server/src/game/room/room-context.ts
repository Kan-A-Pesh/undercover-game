import { BaseState, SetupState } from "./room-state";
import RoomSettings from "shared/models/room-settings";

export default class RoomContext {
  private state: BaseState;
  private settings: RoomSettings;
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
      spectatorMode: false,
    };
  }

  public getState(): BaseState {
    return this.state;
  }

  public getPlayers(): Set<string> {
    return this.players;
  }

  public addPlayer(player: string): boolean {
    if (this.getPlayers().size >= this.settings.maxPlayer) {
      if (!this.settings.spectatorMode) return false;
      this.spectators.add(player);
      return true;
    };
    this.players.add(player);
    return true;
  }

  public removePlayer(player: string): boolean {
    if (!this.getPlayers().has(player)) return false;
    this.players.delete(player);
    return true;
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
    return playerId === this.players.values().next().value;
  }

}
