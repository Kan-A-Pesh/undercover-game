import Icon from "@/components/icon";
import Text from "@/components/ui/text";
import Input from "@/components/ui/input";
import socket from "@/socket";
import useSettingsStore from "@/store/settings";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface LobbySettingsProps {
  hasHostPermission: boolean;
}

export default function LobbySettings({ hasHostPermission }: LobbySettingsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const settingsStore = useSettingsStore();

  // Sync room settings (update)
  useEffect(() => {
    if (!hasHostPermission) return;
    socket.emit("room:settings:update", settingsStore.settings, (response) => {
      if (!response.success) console.error(response.error);
    });
  }, [settingsStore.settings, hasHostPermission]);

  // Sync room settings (listen)
  useEffect(() => {
    socket.on("room:settings:updated", (newSettings) => {
      // Do not update settings if you are the host (prevents loops)
      if (hasHostPermission) return;
      settingsStore.setSettings(newSettings);
    });

    return () => {
      socket.off("room:settings:updated");
    };
  }, [settingsStore, hasHostPermission]);

  // Function to validate and limit numerical values
  const validateNumber = (value: string, min: number, max: number): number => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return min;
    return Math.min(Math.max(num, min), max);
  };

  // Number input handler with validation
  const handleNumberInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof settingsStore.settings,
    min: number,
    max: number,
  ) => {
    const value = validateNumber(e.target.value, min, max);
    settingsStore.setSettings({ ...settingsStore.settings, [key]: value });
  };

  // Toggle handler for boolean values
  const handleToggle = (key: keyof typeof settingsStore.settings) => {
    settingsStore.setSettings({ ...settingsStore.settings, [key]: !settingsStore.settings[key] });
  };

  return (
    <>
      <header className={clsx("flex gap-4 items-center", isExpanded && "mb-4")}>
        <Text type="title">Game Settings</Text>

        <hr className="border-t border-t-white/25 flex-1" />

        <button onClick={() => setIsExpanded(!isExpanded)} className="hover:bg-white/10 p-1 transition-colors">
          <Icon
            name="chevronDown"
            color="white"
            size={16}
            className={clsx("transition-transform", isExpanded && "rotate-180")}
          />
        </button>
      </header>

      {isExpanded && (
        <div className="space-y-4">
          {/* Game Configuration Section */}
          <div className="pb-3 border-b border-white/20">
            <Text type="paragraph" className="mb-3 text-white/70">
              Game Configuration
            </Text>

            {/* Player Settings */}
            <div className="flex justify-between items-center mb-3">
              <Text>Max Players</Text>
              <Input
                type="number"
                className="w-24 text-center"
                value={settingsStore.settings.maxPlayer}
                onChange={(e) => handleNumberInput(e, "maxPlayer", 3, 16)}
                disabled={!hasHostPermission}
                min={3}
                max={16}
              />
            </div>

            <div className="flex justify-between items-center mb-3">
              <Text>Mr. White Count</Text>
              <Input
                type="number"
                className="w-24 text-center"
                value={settingsStore.settings.mrWhiteCount}
                onChange={(e) => handleNumberInput(e, "mrWhiteCount", 0, 3)}
                disabled={!hasHostPermission}
                min={0}
                max={3}
              />
            </div>

            <div className="flex justify-between items-center">
              <Text>Agent Count</Text>
              <Input
                type="number"
                className="w-24 text-center"
                value={settingsStore.settings.agentCount}
                onChange={(e) => handleNumberInput(e, "agentCount", 0, 5)}
                disabled={!hasHostPermission}
                min={0}
                max={5}
              />
            </div>
          </div>

          {/* Time Settings Section */}
          <div className="pb-3 border-b border-white/20">
            <Text type="paragraph" className="mb-3 text-white/70">
              Time Settings
            </Text>

            <div className="flex justify-between items-center mb-3">
              <Text>Word Choosing Duration</Text>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  className="w-24 text-center"
                  value={settingsStore.settings.wordChoosingDuration}
                  onChange={(e) => handleNumberInput(e, "wordChoosingDuration", 10, 120)}
                  disabled={!hasHostPermission}
                  min={10}
                  max={120}
                />
                <Text className="w-10">sec</Text>
              </div>
            </div>

            <div className="flex justify-between items-center mb-3">
              <Text>Debate Duration</Text>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  className="w-24 text-center"
                  value={settingsStore.settings.debateDuration}
                  onChange={(e) => handleNumberInput(e, "debateDuration", 10, 300)}
                  disabled={!hasHostPermission}
                  min={10}
                  max={300}
                />
                <Text className="w-10">sec</Text>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Text>Voting Duration</Text>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  className="w-24 text-center"
                  value={settingsStore.settings.votingDuration}
                  onChange={(e) => handleNumberInput(e, "votingDuration", 10, 120)}
                  disabled={!hasHostPermission}
                  min={10}
                  max={120}
                />
                <Text className="w-10">sec</Text>
              </div>
            </div>
          </div>

          {/* Game Options Section */}
          <div>
            <Text type="paragraph" className="mb-3 text-white/70">
              Options
            </Text>

            <div className="flex justify-between items-center">
              <Text>Spectator Mode</Text>
              <button
                className={clsx(
                  "px-3 py-1 border transition-colors",
                  settingsStore.settings.spectatorMode
                    ? "bg-primary text-black border-primary"
                    : "bg-transparent border-white/30",
                )}
                onClick={() => handleToggle("spectatorMode")}
                disabled={!hasHostPermission}
              >
                <Text>{settingsStore.settings.spectatorMode ? "Enabled" : "Disabled"}</Text>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
