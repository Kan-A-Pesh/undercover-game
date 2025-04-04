import useRouterStore from "./store/router";
import { Routes } from "./types/routes";

export default function Router() {
  const route = useRouterStore((state) => state.route);
  const Route = Routes[route];

  return <Route />;
}
