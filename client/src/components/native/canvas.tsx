import clsx from "clsx";
import { useEffect, useRef } from "react";

export interface RenderProps {
  ctx: CanvasRenderingContext2D;
  frameCount: number;
  time: number;
}

export interface CanvasProps {
  className?: string;
  overlay?: boolean;
  renderFn: (props: RenderProps) => void;
}

export default function Canvas({ className, renderFn, overlay }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!overlay) return;

    const canvas = canvasRef.current;
    if (!canvas) return console.warn("canvas.tsx::useEffect(start) Unable to find canvas element");

    const parent = canvas.parentElement;
    if (!parent) return console.warn("canvas.tsx::useEffect(start) Unable to find parent element");

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();

      const borderTop = -+getComputedStyle(parent).getPropertyValue("border-top-width").replace(/\D/g, "");
      const borderLeft = -getComputedStyle(parent).getPropertyValue("border-left-width").replace(/\D/g, "");

      canvas.style.top = `${borderTop}px`;
      canvas.style.left = `${borderLeft}px`;

      canvas.width = width;
      canvas.height = height;
    };

    parent.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      parent.removeEventListener("resize", resizeCanvas);
    };
  }, [overlay]);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return console.warn("canvas.tsx::useEffect(render) Unable to get 2D context of canvas");

    let frameCount = 0;
    let animationFrameId: number;

    const animate = (time: number) => {
      animationFrameId = window.requestAnimationFrame(animate);
      renderFn({ ctx: context, frameCount, time });
      frameCount++;
    };

    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [renderFn]);

  return <canvas className={clsx(className, overlay && "absolute")} ref={canvasRef}></canvas>;
}
