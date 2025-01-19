import Button from "@/components/ui/button";
import Text from "@/components/ui/text";
import { useAppDispatch } from "@/store/hooks";
import { setRoute } from "@/store/slices/router";

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  const handleRules = () => dispatch(setRoute("rules"));

  return (
    <div>
      <Text type="display">Welcome to the game</Text>
      <Button type="filled" color="primary" size="md" icon="scroll" onClick={handleRules}>
        Read the rules
      </Button>
    </div>
  );
}
