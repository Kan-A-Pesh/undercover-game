import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MyProfileState {
  id: string;
  username: string;
  avatar: string;
  setId: (id: string) => void;
  setUsername: (username: string) => void;
  setAvatar: (avatar: string) => void;
}

const useMyProfileStore = create<MyProfileState>()(
  persist(
    (set) => ({
      id: "angry-octopus",
      username: "angry-octopus",
      avatar: "null",
      setId: (id) => set({ id }),
      setUsername: (username) => set({ username }),
      setAvatar: (avatar) => set({ avatar }),
    }),
    {
      name: "my-profile-storage",
    },
  ),
);

export default useMyProfileStore;
