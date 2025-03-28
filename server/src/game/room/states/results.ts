import { RoomName } from "shared/models/room-name";
import { BaseState } from "../room-state";
import { MR_WHITE_GUESS_DURATION, RESULTS_DURATION } from "shared/constants/results";
import { SetupState } from "./setup";
import Player from "@/game/player";
import { Role } from "shared/models/role";
import { WordChoosingState } from "./word-choosing";

export class ResultsState extends BaseState {
  public readonly name: RoomName = RoomName.Results;

  private resultsEndTimeout: NodeJS.Timeout | null;

  constructor() {
    super();
    this.resultsEndTimeout = null;
  }

  public getStateDuration = () => MR_WHITE_GUESS_DURATION;

  public onMrWhiteGuess = (playerId: string, word: string) => {
    if (this.context.getSharedData().lastEliminatedPlayerId !== playerId) return;
    if (Player.get(playerId)?.getPlayerData().role !== Role.MrWhite) return;
    if (word !== this.context.getSharedData().civilianWord) return;

    if (this.resultsEndTimeout) {
      clearTimeout(this.resultsEndTimeout);
    }

    this.context.getRoom().getIo().emit("game:end", Role.MrWhite);
    this.onResultsEnded();
  };

  public onTransition = () => {
    this.resultsEndTimeout = setTimeout(() => {
      const players = Player.getMultiple(Array.from(this.context.getPlayers()));

      // Check if no undercover players are alive
      if (players.filter((player) => player.getPlayerData().role !== Role.Civilian).length === 0) {
        this.context.getRoom().getIo().emit("game:end", Role.Civilian);
        this.onResultsEnded();
        return;
      }

      // Check if there are two players and one is undercover
      if (
        players.length <= 2 &&
        players.filter((player) => player.getPlayerData().role !== Role.Civilian).length >= 1
      ) {
        this.context.getRoom().getIo().emit("game:end", Role.Agent);
        this.onResultsEnded();
        return;
      }

      // If no one is alive, a new round starts
      this.context.transitionTo(new WordChoosingState());
    }, this.getStateDuration() * 1000);
  };

  public onResultsEnded = () => {
    setTimeout(() => {
      this.context.transitionTo(new SetupState());
    }, RESULTS_DURATION * 1000);
  };
}
