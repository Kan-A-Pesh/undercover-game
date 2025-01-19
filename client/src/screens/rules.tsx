import Button from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { setRoute } from "@/store/slices/router";

export default function RulesScreen() {
  const dispatch = useAppDispatch();

  const handleHome = () => dispatch(setRoute("home"));

  return (
    <div>
      <h1>Rules</h1>
      <Button type="outlined" color="primary" size="md" icon="logout" onClick={handleHome}>
        Go back
      </Button>
    </div>
  );
}
