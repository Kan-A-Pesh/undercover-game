import { create } from "zustand";

interface RoomStore {
  roomId: string | null;
  myWord: string | null | undefined;
  setRoomId: (roomId: string) => void;
  setMyWord: (word: string | null | undefined) => void;
}

const useRoomStore = create<RoomStore>((set) => ({
  roomId: null,
  myWord: undefined,
  setRoomId: (roomId) => set({ roomId }),
  setMyWord: (word) => set({ myWord: word }),
}));

export default useRoomStore;
