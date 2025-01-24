import { useRef } from "react";
import RevealCanvas, { RevealRef } from "./reveal-canvas";

export default function RevealCard() {
  const onReveal = useRef<RevealRef>(null);

  return (
    <>
      <p className="mb-2">Click on the card to reveal it!</p>

      <div
        className="relative w-48 h-16 grid place-items-center border-4 border-black bg-primary text-black"
        onClick={() => onReveal.current?.()}
      >
        <span>Hi!</span>
        <RevealCanvas ref={onReveal} />
      </div>
    </>
  );
}
