import { PlayerProfile } from "#/models/player-profile";
import { create } from "zustand";

interface PlayersState {
  players: PlayerProfile[];
  setPlayers: (players: PlayerProfile[]) => void;
}

const usePlayersStore = create<PlayersState>((set) => ({
  players: [],
  setPlayers: (players) => set({ players }),
}));

export default usePlayersStore;
