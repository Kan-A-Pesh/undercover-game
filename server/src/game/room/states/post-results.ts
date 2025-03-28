import { SetupState } from "./setup";
import { RoomName } from "shared/models/room-name";
import { BaseState } from "../room-state";
import { POST_RESULTS_DURATION } from "shared/constants/results";
import { WordChoosingState } from "./word-choosing";

export class PostResultsState extends BaseState {
  public readonly name: RoomName = RoomName.PostResults;

  public onTransition = () => {
    this.context.getRoom().getIo().emit("game:round:ended", this.context.getSharedData().winner);

    setTimeout(() => {
      if (this.context.getSharedData().winner) {
        this.context.transitionTo(new SetupState());
      } else {
        this.context.transitionTo(new WordChoosingState());
      }
    }, POST_RESULTS_DURATION * 1000);
  };

  public getStateDuration = () => POST_RESULTS_DURATION;
}
