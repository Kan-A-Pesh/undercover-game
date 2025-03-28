import { create } from "zustand";

interface RoomStore {
  roomId: string | null;
  myWord: string | null | undefined;
  setRoomId: (roomId: string) => void;
  setMyWord: (word: string | null | undefined) => void;

  chosenWords: Record<string, string>;
  choosingPlayerId: string | null;
  resetChosenWords: () => void;
  setChosenWord: (playerId: string, word: string) => void;
  setChoosingPlayerId: (playerId: string | null) => void;
}

const useRoomStore = create<RoomStore>((set) => ({
  roomId: null,
  myWord: undefined,
  setRoomId: (roomId) => set({ roomId }),
  setMyWord: (word) => set({ myWord: word }),

  chosenWords: {},
  choosingPlayerId: null,
  resetChosenWords: () => set({ chosenWords: {} }),
  setChosenWord: (playerId, word) => set((state) => ({ chosenWords: { ...state.chosenWords, [playerId]: word } })),
  setChoosingPlayerId: (playerId) => set({ choosingPlayerId: playerId }),
}));

export default useRoomStore;
