import Player from "@/game/player";
import { BaseState } from "../room-state";
import { RoomName } from "shared/models/room-name";
import { ResultsState } from "./results";

export class VotingState extends BaseState {
  public readonly name: RoomName = RoomName.Voting;

  private playersRefCopy: Player[];
  private playersRefCopyMap: { [key: string]: Player };
  private votingEndTimeout: NodeJS.Timeout | null;

  constructor() {
    super();
    this.playersRefCopy = [];
    this.playersRefCopyMap = {};
    this.votingEndTimeout = null;
  }

  public onTransition = () => {
    this.playersRefCopy = Player.getMultiple(Array.from(this.context.getPlayers()));
    this.playersRefCopyMap = this.playersRefCopy.reduce(
      (acc, player) => {
        acc[player.getId()] = player;
        return acc;
      },
      {} as { [key: string]: Player },
    );

    this.votingEndTimeout = setTimeout(this.onVotingEnded, this.getStateDuration() * 1000);
  };

  public getStateDuration = () => this.context.getSettings().votingDuration;

  public onVote = (playerId: string, vote: string) => {
    const player = this.playersRefCopyMap[playerId];
    if (!player) throw new Error("Player not found");
    if (player.getPlayerData().votedPlayer) throw new Error("Player already voted");

    const votedPlayer = this.playersRefCopyMap[vote];
    if (!votedPlayer) throw new Error("Voted player not found");

    this.playersRefCopyMap[playerId].setPlayerData({ votedPlayer: votedPlayer.getId() });
    this.context.getRoom().getIo().emit("game:vote:voted", playerId);

    // Check remaining votes
    const remainingVotes = this.playersRefCopy.filter((player) => !player.getPlayerData().votedPlayer);
    if (remainingVotes.length === 0) {
      this.onVotingEnded();
    }
  };

  public onVotingEnded = () => {
    if (this.votingEndTimeout) {
      clearTimeout(this.votingEndTimeout);
    }

    // Send the vote count to all players
    const playersVotes = this.playersRefCopy.reduce(
      (acc, player) => {
        const votedPlayer = player.getPlayerData().votedPlayer;
        if (!votedPlayer) return acc;

        if (!acc[votedPlayer]) acc[votedPlayer] = 0;

        acc[votedPlayer]++;
        return acc;
      },
      {} as { [key: string]: number },
    );

    const maxVoteCount = Math.max(...Object.values(playersVotes));
    const eliminatedPlayers = Object.keys(playersVotes).filter((playerId) => playersVotes[playerId] === maxVoteCount);

    if (eliminatedPlayers.length === 1) {
      const eliminatedPlayerId = eliminatedPlayers[0];
      this.context.setSharedData({ lastEliminatedPlayerId: eliminatedPlayerId });
      this.context.getRoom().getIo().emit("game:vote:results", playersVotes, eliminatedPlayerId);
      Player.get(eliminatedPlayerId)?.kill();
    } else {
      this.context.getRoom().getIo().emit("game:vote:results", playersVotes, null);
    }

    this.context.transitionTo(new ResultsState());
  };
}
