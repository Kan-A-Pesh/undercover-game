import { ReactNode } from "react";
import Text from "./text";
import Button from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: (value: false) => void;
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80" onClick={() => onClose(false)} />
      <div className="relative z-10 bg-black border border-white min-w-[300px] max-w-md  p-6">
        <Text type="title" className="mb-3 break-words">
          {title}
        </Text>

        <div className="my-3 py-8 border-y border-white/25">{children}</div>

        {footer ?? (
          <div className="flex justify-end">
            <Button type="outlined" color="white" onClick={() => onClose(false)}>
              Ok
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
