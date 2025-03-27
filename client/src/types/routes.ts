import HomeScreen from "@/screens/home";
import LobbyScreen from "@/screens/lobby";
import RulesScreen from "@/screens/rules";

export const Routes = {
  home: HomeScreen,
  rules: RulesScreen,

  // Game states
  lobby: LobbyScreen,
} as const;

export type Route = keyof typeof Routes;
