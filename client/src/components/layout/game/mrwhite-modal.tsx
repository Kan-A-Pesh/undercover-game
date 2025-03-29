import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Text from "@/components/ui/text";
import clsx from "clsx";
import { useState } from "react";

interface MrWhiteModalProps {
  open: boolean;
  onWordChosen: (word: string) => void;
}

export default function MrWhiteModal({ open, onWordChosen }: MrWhiteModalProps) {
  const [word, setWord] = useState("");

  const handleSubmit = () => {
    onWordChosen(word);
    setWord("");
  };

  return (
    <div
      className={clsx(
        "fixed bottom-0 left-0 right-0 p-6 flex flex-col gap-4 transition-transform duration-300 ease-in-out backdrop-blur-lg bg-white/25",
        !open && "translate-y-full",
      )}
    >
      <div>
        <Text type="title">Guess! Fast, fast, fast!</Text>
        <Text type="paragraph">Guess the civilian word to win!</Text>
      </div>

      <Input value={word} onChange={(e) => setWord(e.target.value)} placeholder="Enter a word" />

      <div className="flex pr-12">
        <Button color="primary" className="w-full" onClick={handleSubmit}>
          Confirm word
        </Button>
      </div>
    </div>
  );
}
