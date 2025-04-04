import { Role } from "shared/models/role";

export type SharedData = {
  civilianWord: string;
  lastEliminatedPlayerId?: string;
  winner?: Role;
};
