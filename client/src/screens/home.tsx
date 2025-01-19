import Button from "@/components/ui/button";
import Text from "@/components/ui/text";
import { useAppDispatch } from "@/store/hooks";
import { setRoute } from "@/store/slices/router";

import hat from "@/assets/hat.svg";

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  const handleReadRules = () => dispatch(setRoute("rules"));

  const handleJoinRoom = () => console.log("join room");
  const handleCreateRoom = () => console.log("create room");

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-1">
        <img src={hat} alt="hat" className="h-24" />
        <Text type="display">UNDER</Text>
        <Text type="display">COVER</Text>
      </div>
      <main className="flex flex-1 flex-col items-center justify-center gap-4 max-w-64 mx-auto">
        <section className="flex-1 flex flex-col items-center justify-center gap-2 w-full">
          <Button icon="login" onClick={handleJoinRoom} className="w-full">
            Join a room
          </Button>
          <Button color="white" icon="plus" onClick={handleCreateRoom} className="w-full">
            Create a room
          </Button>
          <Button type="outlined" color="white" icon="scroll" onClick={handleReadRules} className="w-full">
            Read the rules
          </Button>
        </section>

        <section className="flex-1 flex flex-col items-center justify-center gap-2">
          <Text type="title">What is Undercover?</Text>
          <Text type="paragraph">
            Undercover is a game where you play as a undercover agent. You will be given a list of people to choose from
            and you will have to guess who they are.
          </Text>
          <Text type="paragraph">
            Once you have guessed the correct person, you will be given a hint to help you in your next guess.
          </Text>
        </section>
      </main>
    </>
  );
}
