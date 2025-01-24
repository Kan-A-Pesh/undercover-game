import clsx from "clsx";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import Canvas, { RenderProps } from "../../native/canvas";

export type RevealRef = () => void | null;

interface RevealProps {
  className?: string;
}

export default forwardRef<() => void, RevealProps>(function Reveal({ className }, ref) {
  const timestamp = useRef<number>(0);
  const revealTimestamp = useRef<number | null>(null);

  const onReveal = useCallback(() => {
    revealTimestamp.current = timestamp.current;
  }, []);

  const render = useCallback(({ ctx, frameCount, time }: RenderProps) => {
    timestamp.current = time;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const revealSince = timestamp.current - (revealTimestamp.current ?? timestamp.current);

    if (revealSince > 0) {
      ctx.fillStyle = `rgba(0, 0, 0, ${1 - revealSince / 1000})`;
    } else {
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
    }

    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }, []);

  useImperativeHandle(ref, () => onReveal);

  return <Canvas className={clsx("absolute inset-0", className)} renderFn={render} overlay />;
});
