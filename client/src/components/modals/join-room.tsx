import Button from "../ui/button";
import { Modal } from "../ui/modal";
import Text from "../ui/text";

interface JoinRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (code: string) => void;
}

export function JoinRoomModal({ isOpen, onClose, onJoin }: JoinRoomModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const code = formData.get("code") as string;
    onJoin(code);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Join a room"
      footer={
        <div className="flex justify-end">
          <Button icon="login" type="filled" color="primary">
            Join
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <Text type="paragraph" color="white">
          Enter your room code
        </Text>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="code"
            placeholder="XXX-XXX"
            pattern="[A-Za-z0-9]{3}-[A-Za-z0-9]{3}"
            className="w-full bg-transparent border border-white px-4 py-2 text-white font-body placeholder:text-white/50 focus:outline-none"
            required
          />
        </form>
      </div>
    </Modal>
  );
}
