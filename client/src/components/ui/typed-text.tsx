import { useEffect } from "react";
import { useState } from "react";

interface TypedTextProps {
  text: string;
}

export default function TypedText({ text }: TypedTextProps) {
  const [typedText, setTypedText] = useState("");
  const [remainingText, setRemainingText] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingText.length > 0) {
        setTypedText((prev) => prev + remainingText[0]);
        setRemainingText((prev) => prev.slice(1));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [typedText, remainingText]);

  return typedText;
}
