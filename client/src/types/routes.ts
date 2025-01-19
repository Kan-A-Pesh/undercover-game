import HomeScreen from "@/screens/home";
import RulesScreen from "@/screens/rules";

export const Routes = {
  home: HomeScreen,
  rules: RulesScreen,
} as const;

export type Route = keyof typeof Routes;
