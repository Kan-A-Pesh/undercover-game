import { BaseState } from "./room-state";
import RoomSettings from "shared/models/room-settings";
import { SetupState } from "./states/setup";
import Room from "../room";
import { SharedData } from "./shared-data";

export default class RoomContext {
  private state: BaseState;
  private settings: RoomSettings;
  private players: Set<string>; // All playerIds
  private spectators: Set<string>;
  private room: Room;
  private sharedData: SharedData;

  constructor(room: Room) {
    this.room = room;
    this.state = new SetupState();
    this.players = new Set<string>();
    this.spectators = new Set<string>();
    this.settings = {
      maxPlayer: 10,
      mrWhiteCount: 1,
      agentCount: 2,
      wordChoosingDuration: 60,
      debateDuration: 60,
      votingDuration: 60,
      spectatorMode: false,
    };
    // Setting the shared data here to avoid lint error
    this.sharedData = this.resetSharedData();
  }

  public getState(): BaseState {
    return this.state;
  }

  public getPlayers(): Set<string> {
    return this.players;
  }

  public resetSharedData() {
    this.sharedData = {
      civilianWord: "",
    };

    return this.sharedData;
  }

  public setSharedData(sharedData: Partial<SharedData>) {
    this.sharedData = { ...this.sharedData, ...sharedData };
  }

  public getSharedData(): SharedData {
    return this.sharedData;
  }

  public addPlayer(player: string): boolean {
    if (this.getPlayers().size >= this.settings.maxPlayer) {
      if (!this.settings.spectatorMode) return false;
      this.spectators.add(player);
      return true;
    }
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

  public getRoom() {
    return this.room;
  }

  public setSettings(settings: RoomSettings) {
    this.settings = settings;
  }

  public getSettings(): RoomSettings {
    return this.settings;
  }

  public transitionTo(state: BaseState) {
    this.state = state;
    state.setContext(this);
    this.room.getIo().emit("game:state:updated", state.name, state.getStateDuration());
    state.onTransition();
  }

  public isHost(playerId: string): boolean {
    return playerId === this.players.values().next().value;
  }
}
