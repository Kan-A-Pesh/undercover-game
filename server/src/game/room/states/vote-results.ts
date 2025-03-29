import { RoomName } from "shared/models/room-name";
import { BaseState } from "../room-state";
import { VOTE_RESULTS_DURATION } from "shared/constants/results";
import Player from "@/game/player";
import { Role } from "shared/models/role";
import { PostResultsState } from "./post-results";

export class VoteResultsState extends BaseState {
  public readonly name: RoomName = RoomName.VoteResults;

  private resultsEndTimeout: NodeJS.Timeout | null;

  constructor() {
    super();
    this.resultsEndTimeout = null;
  }

  public getStateDuration = () => VOTE_RESULTS_DURATION;

  public onMrWhiteGuess = (playerId: string, word: string) => {
    if (this.context.getSharedData().lastEliminatedPlayerId !== playerId) return;
    if (Player.get(playerId)?.getPlayerData().role !== Role.MrWhite) return;
    if (word !== this.context.getSharedData().civilianWord) return;

    if (this.resultsEndTimeout) {
      clearTimeout(this.resultsEndTimeout);
    }

    this.context.setSharedData({ winner: Role.MrWhite });
    this.context.transitionTo(new PostResultsState());
  };

  public onTransition = () => {
    this.resultsEndTimeout = setTimeout(() => {
      const players = Player.getMultiple(Array.from(this.context.getPlayers())).filter((player) =>
        player.getAliveStatus(),
      );

      // Check if no undercover players are alive
      if (players.filter((player) => player.getPlayerData().role !== Role.Civilian).length === 0) {
        this.context.setSharedData({ winner: Role.Civilian });
        this.context.transitionTo(new PostResultsState());
        return;
      }

      // Check if there is no
      if (players.filter((player) => player.getPlayerData().role === Role.Civilian).length <= 1) {
        this.context.setSharedData({ winner: Role.Agent });
        this.context.transitionTo(new PostResultsState());
        return;
      }

      // If no one is alive, a new round starts
      this.context.transitionTo(new PostResultsState());
    }, this.getStateDuration() * 1000);
  };
}
