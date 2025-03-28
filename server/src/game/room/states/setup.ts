import { BaseState } from "../room-state";
import { WordAttributionState } from "./word-attribution";
import RoomSettings from "shared/models/room-settings";
import { RoomName } from "shared/models/room-name";

export class SetupState extends BaseState {
  public readonly name: RoomName = RoomName.Setup;

  public startGame = () => {
    this.context.transitionTo(new WordAttributionState());
  };

  public setSettings = (settings: RoomSettings): boolean => {
    this.context.setSettings(settings);
    return true;
  };

  public getSettings = (): RoomSettings => {
    return this.context.getSettings();
  };

  public onTransition = () => {
    this.context.resetSharedData();
  };

  public getStateDuration = () => undefined;
}
