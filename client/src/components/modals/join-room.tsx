import { KeyboardEvent, useCallback, useState } from "react";
import Button from "../ui/button";
import { Modal } from "../ui/modal";
import Text from "../ui/text";

const JOIN_CODE_PATTERN = "[A-Za-z0-9]{3}-[A-Za-z0-9]{3}";

interface JoinRoomModalProps {
  isOpen: boolean;
  onClose: (value: false) => void;
  onJoin: (code: string) => void;
}

export function JoinRoomModal({ isOpen, onClose, onJoin }: JoinRoomModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleJoin = useCallback(() => {
    if (!code.match(JOIN_CODE_PATTERN)) {
      setError(`Invalid code format`);
      return;
    }

    onJoin(code);
  }, [onJoin, code]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      setError("");
      if (e.key !== "Enter") return;

      e.preventDefault();
      handleJoin();
    },
    [handleJoin],
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose(false)}
      title="Join a room"
      footer={
        <div className="flex justify-end">
          <Button icon="login" type="filled" color="primary" onClick={handleJoin}>
            Join
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <Text type="paragraph" color="white">
          Enter your room code
        </Text>

        <form onSubmit={handleJoin} className="w-64">
          <input
            type="text"
            name="code"
            placeholder="XXX-XXX"
            pattern={JOIN_CODE_PATTERN}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border border-white px-4 py-2 text-white font-body placeholder:text-white/50 focus:outline-none"
            required
          />
          {error && (
            <Text type="caption" color="primary" className="mt-1">
              {error}
            </Text>
          )}
        </form>
      </div>
    </Modal>
  );
}
