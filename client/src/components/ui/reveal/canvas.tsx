import clsx from "clsx";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import Canvas, { RenderProps } from "../../native/canvas";
import { REVEAL_CONSTANTS } from "./constants";
import { parseColor, random } from "./utils";

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

  const render = useCallback(({ ctx, time }: RenderProps) => {
    timestamp.current = time;
    const revealSince = timestamp.current - (revealTimestamp.current ?? timestamp.current);
    const revealProgress = Math.min(revealSince / REVEAL_CONSTANTS.duration, 1);

    const { height: h, width: w } = ctx.canvas;
    ctx.clearRect(0, 0, w, h);

    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(Math.min(revealProgress * 1.5, 1), "transparent");
    gradient.addColorStop(0 + Math.min(revealProgress * 3, 1), parseColor(REVEAL_CONSTANTS.gradientStart, 1));
    gradient.addColorStop(1, parseColor(REVEAL_CONSTANTS.gradientEnd, 1));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Calculate grid
    const hGridCount = Math.round(w / REVEAL_CONSTANTS.preferredGridSize);
    const vGridCount = Math.round(h / REVEAL_CONSTANTS.preferredGridSize);

    const hGridSize = w / hGridCount;
    const vGridSize = h / vGridCount;

    // Draw grid
    const scaledTime = (timestamp.current / 1000) * REVEAL_CONSTANTS.pulsingSpeed;
    const maxDistance = hGridCount + vGridCount;

    for (let x = 0; x < hGridCount; x++) {
      for (let y = 0; y < vGridCount; y++) {
        const gridX = x * hGridSize + REVEAL_CONSTANTS.gridSpacing / 2;
        const gridY = y * vGridSize + REVEAL_CONSTANTS.gridSpacing / 2;

        const gridIndex = x + y * hGridCount;
        const distance = (x + y) / maxDistance;
        const randomIndex = random(x, y);

        if (distance < revealProgress) {
          const alpha = Math.max(((revealProgress - distance) / (1 - distance) - 0.5) * -2, 0);
          // const alpha = (revealProgress - distance) / (1 - distance) > 0.8 ? 0 : 1;

          ctx.fillStyle = parseColor(
            randomIndex > 0.5 ? REVEAL_CONSTANTS.gradientStart : REVEAL_CONSTANTS.gradientEnd,
            alpha,
          );
        } else {
          const randomDisplacement = Math.sin(scaledTime + randomIndex * 3) * 0.5 + 0.5;
          const waveDisplacement = Math.sin(scaledTime + gridIndex * Math.round(hGridCount / 8)) * 0.5 + 0.5;

          const gridOpacity = randomDisplacement * 0.2 + waveDisplacement * 0.3 + 0.5;

          ctx.fillStyle = `rgba(0, 0, 0, ${gridOpacity})`;
        }
        ctx.fillRect(gridX, gridY, hGridSize - REVEAL_CONSTANTS.gridSpacing, vGridSize - REVEAL_CONSTANTS.gridSpacing);
      }
    }
  }, []);

  useImperativeHandle(ref, () => onReveal);

  return <Canvas className={clsx("absolute inset-0", className)} renderFn={render} overlay />;
});
