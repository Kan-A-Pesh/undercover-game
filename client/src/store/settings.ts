import RoomSettings from "#/models/room-settings";
import { create } from "zustand";

interface SettingsState {
  settings: RoomSettings;
  setSettings: (settings: RoomSettings) => void;
}

const useSettingsStore = create<SettingsState>((set) => ({
  settings: {
    maxPlayer: 10,
    mrWhiteCount: 0,
    agentCount: 1,
    wordChoosingDuration: 60,
    debateDuration: 60,
    votingDuration: 60,
    spectatorMode: false,
  },
  setSettings: (settings) => set({ settings }),
}));

export default useSettingsStore;
