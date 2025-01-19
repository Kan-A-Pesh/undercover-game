import { useAppSelector } from "./store/hooks";
import { Routes } from "./types/routes";

export default function Router() {
  const route = useAppSelector((state) => state.router.route);
  const Route = Routes[route];

  return <Route />;
}
