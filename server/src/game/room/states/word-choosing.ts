import Player from "@/game/player";
import { RoomName } from "shared/models/room-name";
import { BaseState } from "../room-state";
import { DebateState } from "./debate";

export class WordChoosingState extends BaseState {
  public readonly name: RoomName = RoomName.WordChoosing;

  private playersRefCopy: Player[];

  private currentPlayerIndex: number;
  private startPlayerIndex: number;

  private nextPlayerTimeout: NodeJS.Timeout | null;

  // Add this so the lint doesn't cry because
  // "nuh uh property has no initializer and is not definitely assigned in the constructor"
  constructor() {
    super();
    this.playersRefCopy = [];
    this.currentPlayerIndex = 0;
    this.startPlayerIndex = 0;
    this.nextPlayerTimeout = null;
  }

  public onTransition = () => {
    this.playersRefCopy = Player.getMultiple(Array.from(this.context.getPlayers()));

    // Select a random player to start the word choosing
    this.currentPlayerIndex = Math.floor(Math.random() * this.playersRefCopy.length);
    this.startPlayerIndex = this.currentPlayerIndex;

    this.sendWordChoosing();
  };

  public getStateDuration = () => this.context.getSettings().wordChoosingDuration;

  public nextPlayer = () => {
    if (this.currentPlayerIndex !== this.startPlayerIndex) {
      return this.sendWordChoosing();
    }

    // Change to voting state
    this.context.transitionTo(new DebateState());
  };

  public sendWordChoosing = () => {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playersRefCopy.length;
    const player = this.playersRefCopy[this.currentPlayerIndex];
    this.context.getRoom().getIo().emit("game:word:choosing", player.getId());

    this.nextPlayerTimeout = setTimeout(this.nextPlayer, this.getStateDuration() * 1000);
  };

  public onWordChosen = (playerId: string, word: string) => {
    if (this.nextPlayerTimeout) {
      clearTimeout(this.nextPlayerTimeout);
    }

    const nextPlayerId = this.playersRefCopy[this.currentPlayerIndex].getId();
    if (nextPlayerId !== playerId) {
      throw new Error("Player is not the next player");
    }

    this.context.getRoom().getIo().emit("game:word:chosen", playerId, word);
    this.playersRefCopy[this.currentPlayerIndex].setPlayerData({ chosenWord: word });

    this.nextPlayer();
  };
}
