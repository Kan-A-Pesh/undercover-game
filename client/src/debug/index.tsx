import DebugBreakpoint from "./breakpoint";
import DebugStore from "./store";

export default function Debug() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="fixed top-1 left-1 opacity-30 hover:opacity-100 px-2 py-1 flex border border-white bg-black gap-1 text-paragraph">
      <DebugBreakpoint />
      <DebugStore />
    </div>
  );
}
