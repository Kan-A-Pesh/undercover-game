import useRouterStore from "@/store/router";
import { Route, Routes } from "@/types/routes";

export default function DebugStore() {
  const { route, setRoute } = useRouterStore();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoute(e.target.value as Route);
  };

  return (
    <span>
      <select value={route} onChange={handleChange}>
        {Object.keys(Routes).map((key) => (
          <option key={key}>{key}</option>
        ))}
      </select>
    </span>
  );
}
