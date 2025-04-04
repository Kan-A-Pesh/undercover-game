import Player from "@/game/player";
import { BaseState } from "../room-state";
import { Role } from "shared/models/role";
import { WORD_ATTRIBUTION_DURATION } from "shared/constants/word-attribution";
import { WordChoosingState } from "./word-choosing";
import { RoomName } from "shared/models/room-name";

export class WordAttributionState extends BaseState {
  public readonly name: RoomName = RoomName.WordAttribution;

  public getStateDuration = () => WORD_ATTRIBUTION_DURATION;

  public onTransition = () => {
    const settings = this.context.getSettings();
    const players = Player.getMultiple(Array.from(this.context.getPlayers()));

    const mrWhiteRoles = [...Array(settings.mrWhiteCount)].map(() => Role.MrWhite);
    const agentRoles = [...Array(settings.agentCount)].map(() => Role.Agent);
    const civilianRoles = [...Array(players.length - mrWhiteRoles.length - agentRoles.length)].map(() => Role.Civilian);

    const roles = [...mrWhiteRoles, ...agentRoles, ...civilianRoles];
    const shuffledRoles = roles.sort(() => Math.random() - 0.5); // TODO: Make this more secure lol

    //! TODO: Fetch words from the service
    const civilianWord = "cat (cvl)";
    const agentWord = "dog (agt)";

    this.context.setSharedData({ civilianWord });

    // Distribute the roles and words to the players
    players.forEach((player, index) => {
      player.setPlayerData({ role: shuffledRoles[index] });

      if (shuffledRoles[index] === Role.Civilian) {
        player.getIo()?.emit("game:word:attribution", civilianWord);
      } else if (shuffledRoles[index] === Role.Agent) {
        player.getIo()?.emit("game:word:attribution", agentWord);
      } else if (shuffledRoles[index] === Role.MrWhite) {
        player.getIo()?.emit("game:word:attribution", null);
      }
    });

    // Start the timer
    setTimeout(() => {
      this.context.transitionTo(new WordChoosingState());
    }, this.getStateDuration() * 1000);
  };
}
