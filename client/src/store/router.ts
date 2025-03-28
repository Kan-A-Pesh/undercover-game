import { Route } from "@/types/routes";
import { create } from "zustand";

interface RouterState {
  route: Route;
  setRoute: (route: Route) => void;
}

const useRouterStore = create<RouterState>((set) => ({
  route: "home",
  setRoute: (route) => set({ route }),
}));

export default useRouterStore;
