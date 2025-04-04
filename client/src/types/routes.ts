import HomeScreen from "@/screens/home";
import GameScreen from "@/screens/game";
import RulesScreen from "@/screens/rules";

export const Routes = {
  home: HomeScreen,
  rules: RulesScreen,
  game: GameScreen,
} as const;

export type Route = keyof typeof Routes;
