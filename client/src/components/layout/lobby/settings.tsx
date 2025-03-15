import Icon from "@/components/icon";
import Text from "@/components/ui/text";
import clsx from "clsx";
import { useState } from "react";

export default function LobbySettings() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <header className={clsx("flex gap-4 items-center", isExpanded && "mb-4")}>
        <Text type="title">Settings</Text>

        <hr className="border-t border-t-white/25 flex-1" />

        <button onClick={() => setIsExpanded(!isExpanded)}>
          <Icon name="chevronDown" color="white" size={16} className={clsx(isExpanded && "rotate-180")} />
        </button>
      </header>

      {isExpanded && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Text>Game mode</Text>
            <div className="relative">
              <button className="bg-black border border-white/20 px-4 py-2 flex items-center gap-2">
                <Text>{"gameMode"}</Text>
                <Icon name="chevronDown" color="white" size={16} />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Text>Debate duration</Text>
            <div className="bg-black border border-white/20 px-4 py-2">
              <Text>{"debateDuration"} sec</Text>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Text>Vote duration</Text>
            <div className="bg-black border border-white/20 px-4 py-2">
              <Text>{"voteDuration"} sec</Text>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
