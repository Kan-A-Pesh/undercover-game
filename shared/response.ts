import { Member } from "./models/member";
import { Settings } from "./models/settings";

export type Response<T> = {
  success: true;
  data: T;
  error: null;
} | {
  success: false;
  data: null;
  error: string;
};

export type JoinResponse = Response<{
  settings: Settings;
  members: Member[];
}>;

export type NewPlayerResponse = Response<Member>;
export type SettingUpdateResponse = Response<Partial<Settings>>;