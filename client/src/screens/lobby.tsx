import { useMemo, useState } from "react";
import Button from "@/components/ui/button";
import Text from "@/components/ui/text";
import Icon from "@/components/icon";
import LobbySettings from "@/components/layout/lobby/settings";

interface Member {
  id: string;
  username: string;
  isHost?: boolean;
  isYou?: boolean;
}

export default function LobbyScreen() {
  const [username, setUsername] = useState("angry-octopus");
  const [members] = useState<Member[]>([
    { id: "1", username: "roasted-recognition", isHost: true },
    { id: "2", username: "versed-futility", isYou: true },
    { id: "3", username: "raspy-threshold" },
  ]);

  const hasHostPermission = useMemo(() => members.some((member) => member.isHost && member.isYou), [members]);

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <div className="w-24 h-24 border border-white flex-shrink-0 relative">
          {/* TODO: Add avatar */}
          <Button
            icon="refresh"
            type="outlined"
            color="white"
            size="sm"
            className="mt-2 absolute -bottom-px -right-px"
          />
        </div>
        <div className="flex-1">
          <Text type="paragraph" className="mb-1">
            Your username
          </Text>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-black border border-white/20 p-2 text-white font-body"
          />
        </div>
      </div>
      <LobbySettings />

      {/* Members */}
      <div>
        <Text type="title" className="mb-4">
          Members
        </Text>
        <div className="space-y-2">
          {members.map((member) => (
            <div key={member.id} className="flex items-center gap-2 bg-black border border-white/20 p-2">
              <div className="w-8 h-8 border border-white flex-shrink-0"></div>

              <Text>{member.username}</Text>

              {member.isHost && <Icon name="crown" color="white" size={16} />}

              {member.isYou && (
                <div className="inline-flex bg-primary px-1 py-0.5">
                  <Text type="caption" color="white">
                    YOU
                  </Text>
                </div>
              )}

              {hasHostPermission && <Button className="ms-auto" size="sm" type="outlined" icon="cross" />}
            </div>
          ))}
        </div>
      </div>
      {/* Bottom Actions */}
      <div className="mt-auto flex gap-2">
        <Button icon="logout" type="outlined" color="white" />
        <Button color="primary" className="flex-1">
          Start game
        </Button>
        <Button icon="message" color="white" />
      </div>
    </div>
  );
}
