import { useRef } from "react";
import RevealCanvas, { RevealRef } from "./canvas";
import Text from "../text";

export default function RevealStory() {
  const onReveal = useRef<RevealRef>(null);

  return (
    <>
      <Text className="mb-2">Click on the card to reveal it!</Text>

      <div
        className="relative w-48 h-16 grid place-items-center border-4 border-white bg-primary text-white"
        onClick={() => onReveal.current?.()}
      >
        <Text>Hi!</Text>
        <RevealCanvas ref={onReveal} />
      </div>
    </>
  );
}
