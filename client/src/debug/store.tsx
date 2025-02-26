import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setRoute } from "@/store/slices/router";
import { Route, Routes } from "@/types/routes";

export default function DebugStore() {
  const route = useAppSelector((state) => state.router.route);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setRoute(e.target.value as Route));
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
