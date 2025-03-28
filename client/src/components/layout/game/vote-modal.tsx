import Button from "@/components/ui/button";
import Text from "@/components/ui/text";
import clsx from "clsx";

interface VoteModalProps {
  open: boolean;
  canConfirm: boolean;
  onVoteSelected: () => void;
}

export default function VoteModal({ open, canConfirm, onVoteSelected }: VoteModalProps) {
  const handleSubmit = () => {
    onVoteSelected();
  };

  return (
    <div
      className={clsx(
        "fixed bottom-0 left-0 right-0 p-6 flex flex-col gap-4 transition-transform duration-300 ease-in-out backdrop-blur-lg bg-white/25",
        !open && "translate-y-full",
      )}
    >
      <div>
        <Text type="title">Vote, Eliminate, Win</Text>
        <Text type="paragraph">Simple, right? Choose wisely.</Text>
      </div>

      <div className="flex pr-12">
        <Button color="primary" className="w-full" onClick={handleSubmit} disabled={!canConfirm}>
          Confirm vote
        </Button>
      </div>
    </div>
  );
}
