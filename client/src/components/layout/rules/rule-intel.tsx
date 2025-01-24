import Icon, { IconName } from "@/components/icon";
import Text from "@/components/ui/text";
import clsx from "clsx";

interface RuleIntelProps {
  icon: IconName;
  children: React.ReactNode;
  special?: boolean;
}

export default function RuleIntel({ icon, children, special }: RuleIntelProps) {
  return (
    <div className="flex items-start gap-2">
      <div className={clsx("bg-black min-w-8 min-h-8 grid place-items-center", special && "border-2 border-primary")}>
        <Icon name={icon} color={special ? "primary" : "white"} size={24} />
      </div>
      <Text className="my-auto">{children}</Text>
    </div>
  );
}
