import Text from "@/components/ui/text";
import clsx from "clsx";
import useRoomStore from "@/store/room";

export default function WordAttributionScreen() {
  const word = useRoomStore((state) => state.myWord);

  if (word === undefined) return null;

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col gap-8 items-stretch justify-center">
      <Text type="title">&gt; {word ? "Your word is" : "You are"}</Text>
      <h1 className={clsx("font-body text-small-display", word ? "text-secondary" : "text-white")}>
        {word ?? "Mr. White"}
      </h1>
      <hr className="border-white/50" />
      {word ? (
        <Text type="paragraph">
          You are a civilian (or a spy) who must say a word{" "}
          <span className="text-secondary">similar to your given word</span>.
          <br />
          <br />
          And work with the other civilians to identify the spies among you.
        </Text>
      ) : (
        <Text type="paragraph">
          You are a spy working with other spies to <span className="text-secondary">eliminate the civilians</span>.
          <br />
          <br />
          When eliminated, you can win the game by guessing the civilians' word.
        </Text>
      )}
    </div>
  );
}
