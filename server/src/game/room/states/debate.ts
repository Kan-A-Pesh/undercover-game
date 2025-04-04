import { RoomName } from "shared/models/room-name";
import { BaseState } from "../room-state";
import { VotingState } from "./voting";

export class DebateState extends BaseState {
  public readonly name: RoomName = RoomName.Debate;

  public getStateDuration = () => this.context.getSettings().debateDuration;

  public onTransition = () => {
    setTimeout(() => {
      this.context.transitionTo(new VotingState());
    }, this.getStateDuration() * 1000);
  };
}
