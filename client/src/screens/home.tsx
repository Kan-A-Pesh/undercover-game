import Button from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { setRoute } from "@/store/slices/router";

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  const handleRules = () => dispatch(setRoute("rules"));

  return (
    <div>
      <h1>Home</h1>
      <Button type="filled" color="primary" size="md" icon="scroll" onClick={handleRules}>
        Read the rules
      </Button>
    </div>
  );
}
