import Text from "@/components/ui/text";
import clsx from "clsx";

interface YouBadgeProps {
  className?: string;
}

export default function YouBadge({ className }: YouBadgeProps) {
  return (
    <div className={clsx("inline-flex bg-primary px-1 py-0.5 flex-shrink-0", className)}>
      <Text type="caption" color="white">
        YOU
      </Text>
    </div>
  );
}
