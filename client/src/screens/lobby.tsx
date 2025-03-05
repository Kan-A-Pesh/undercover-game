import { useMemo, useState } from "react";
import Button from "@/components/ui/button";
import Text from "@/components/ui/text";
import Icon from "@/components/icon";

interface Member {
  id: string;
  username: string;
  isHost?: boolean;
  isYou?: boolean;
}

export default function LobbyScreen() {
  const [username, setUsername] = useState("angry-octopus");
  const [gameMode, setGameMode] = useState("1 Agent & 2 Mr.White");
  const [debateDuration, setDebateDuration] = useState(60);
  const [voteDuration, setVoteDuration] = useState(30);
  const [members] = useState<Member[]>([
    { id: "1", username: "roasted-recognition", isHost: true },
    { id: "2", username: "versed-futility", isYou: true },
    { id: "3", username: "raspy-threshold" },
  ]);

  const hasHostPermission = useMemo(() => members.some((member) => member.isHost && member.isYou), [members]);

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <div className="w-20 h-20 border border-white flex-shrink-0"></div>
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
          <Button icon="refresh" type="outlined" color="white" size="sm" className="mt-2">
            Regenerate avatar
          </Button>
        </div>
      </div>
      {/* Settings */}
      <div>
        <Text type="title" className="mb-4">
          Settings
        </Text>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Text>Game mode</Text>
            <div className="relative">
              <button className="bg-black border border-white/20 px-4 py-2 flex items-center gap-2">
                <Text>{gameMode}</Text>
                <Icon name="chevronDown" color="white" size={16} />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Text>Debate duration</Text>
            <div className="bg-black border border-white/20 px-4 py-2">
              <Text>{debateDuration} sec</Text>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Text>Vote duration</Text>
            <div className="bg-black border border-white/20 px-4 py-2">
              <Text>{voteDuration} sec</Text>
            </div>
          </div>
        </div>
      </div>
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
        <Button icon="message" type="outlined" color="white" />
        <Button color="primary" className="flex-1">
          Start game
        </Button>
      </div>
    </div>
  );
}
