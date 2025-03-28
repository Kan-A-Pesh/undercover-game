import Text from "@/components/ui/text";
import clsx from "clsx";

interface DebateModalProps {
  open: boolean;
}

export default function DebateModal({ open }: DebateModalProps) {
  return (
    <div
      className={clsx(
        "fixed bottom-0 left-0 right-0 p-6 pr-20 transition-transform duration-300 ease-in-out backdrop-blur-lg bg-white/25",
        !open && "translate-y-full",
      )}
    >
      <Text type="title">Debate!</Text>
      <Text type="paragraph">Let's find out who is the undercover.</Text>
    </div>
  );
}
