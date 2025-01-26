import Hat from "@/assets/svgs/hat";
import Text from "@/components/ui/text";
import { Color } from "@/types/color";
import clsx from "clsx";
import RuleIntel from "./rule-intel";

interface RuleCardProps {
  hatColor: Color;
  name: string;
  description: string;
  word: string;
  speak: string;
  target: string;
  special?: string;
}

export default function RuleCard({ hatColor, name, description, word, speak, target, special }: RuleCardProps) {
  return (
    <div className="flex flex-col gap-4 bg-white/15 p-4">
      <header className="flex items-center gap-2">
        <div className="border border-white bg-black min-w-12 min-h-12 grid place-items-center">
          <Hat className={clsx("w-8 h-4", `text-${hatColor}`)} />
        </div>
        <div>
          <Text color={hatColor}>{name}</Text>
          <Text className="opacity-50">{description}</Text>
        </div>
      </header>
      <hr className="border-t border-t-white/50 w-full" />

      <RuleIntel icon="word">{word}</RuleIntel>
      <RuleIntel icon="sound">{speak}</RuleIntel>
      <RuleIntel icon="target">{target}</RuleIntel>
      {special && (
        <RuleIntel icon="stars" special>
          <span className="text-primary uppercase">Special: </span>
          {special}
        </RuleIntel>
      )}
    </div>
  );
}
