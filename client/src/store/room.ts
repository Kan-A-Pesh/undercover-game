import { create } from "zustand";
import { Role } from "#/models/role";

interface RoomStore {
  roomId: string | null;
  myWord: string | null | undefined;
  roomTimerEnd: number;
  setRoomId: (roomId: string) => void;
  setMyWord: (word: string | null | undefined) => void;
  setRoomTimerEnd: (timerEnd: number) => void;

  chosenWords: Record<string, string>;
  choosingPlayerId: string | null;
  resetChosenWords: () => void;
  setChosenWord: (playerId: string, word: string) => void;
  setChoosingPlayerId: (playerId: string | null) => void;

  winnerRole: Role | null;
  eliminatedPlayerIds: string[];
  setWinnerRole: (role: Role | null) => void;
  addEliminatedPlayerId: (playerId: string) => void;

  resetForNewRound: () => void;
  resetForNewGame: () => void;
}

const useRoomStore = create<RoomStore>((set) => ({
  roomId: null,
  myWord: undefined,
  roomTimerEnd: 0,
  setRoomId: (roomId) => set({ roomId }),
  setMyWord: (word) => set({ myWord: word }),
  setRoomTimerEnd: (timer) => set({ roomTimerEnd: timer * 1000 + Date.now() }),

  chosenWords: {},
  choosingPlayerId: null,
  resetChosenWords: () => set({ chosenWords: {} }),
  setChosenWord: (playerId, word) => set((state) => ({ chosenWords: { ...state.chosenWords, [playerId]: word } })),
  setChoosingPlayerId: (playerId) => set({ choosingPlayerId: playerId }),

  winnerRole: null,
  eliminatedPlayerIds: [],
  setWinnerRole: (role) => set({ winnerRole: role }),
  addEliminatedPlayerId: (playerId) =>
    set((state) => ({ eliminatedPlayerIds: [playerId, ...state.eliminatedPlayerIds] })),

  resetForNewRound: () =>
    set({
      chosenWords: {},
      choosingPlayerId: null,
    }),

  resetForNewGame: () =>
    set({
      roomId: null,
      myWord: undefined,
      roomTimerEnd: -1,
      chosenWords: {},
      choosingPlayerId: null,
      winnerRole: null,
      eliminatedPlayerIds: [],
    }),
}));

export default useRoomStore;
