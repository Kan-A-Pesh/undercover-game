import { useEffect, useMemo } from "react";
import Button from "@/components/ui/button";
import Text from "@/components/ui/text";
import Icon from "@/components/icon";
import LobbySettings from "@/components/layout/lobby/settings";
import usePlayersStore from "@/store/players";
import useMyProfileStore from "@/store/my-profile";
import socket from "@/socket";
import useRoomStore from "@/store/room";
import Input from "@/components/ui/input";
import YouBadge from "@/components/layout/you-badge";

export default function LobbyScreen() {
  const playerStore = usePlayersStore();
  const myProfileStore = useMyProfileStore();
  const roomId = useRoomStore((state) => state.roomId);
  const socketId = useMyProfileStore((state) => state.id);

  const members = useMemo(
    () =>
      playerStore.players.map((player, index) => ({
        id: player.id,
        username: player.username,
        isHost: index === 0,
        isYou: player.id === socketId,
      })),
    [playerStore.players, socketId],
  );

  const hasHostPermission = useMemo(() => members.some((member) => member.isHost && member.isYou), [members]);

  // Listen for players updates
  useEffect(() => {
    socket.on("player:profile:updated", (playerId, profile) => {
      playerStore.setPlayers(playerStore.players.map((p) => (p.id === playerId ? profile : p)));
    });

    return () => {
      socket.off("player:profile:updated");
    };
  }, [playerStore]);

  // Sync my profile
  useEffect(() => {
    socket.emit(
      "player:profile:update",
      {
        username: myProfileStore.username,
        avatar: myProfileStore.avatar,
      },
      (response) => {
        if (!response.success) console.error(response.error);
      },
    );
  }, [myProfileStore]);

  const handleStartGame = () => {
    socket.emit("game:setup:start", null, (response) => {
      if (!response.success) console.error(response.error);
    });
  };

  return (
    <div className="flex flex-col gap-2">
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
            value={myProfileStore.username}
            onChange={(e) => myProfileStore.setUsername(e.target.value)}
            className="w-full bg-black border border-white/20 p-2 text-white font-body"
          />
        </div>
      </div>

      <header className="flex gap-4 items-center mt-6 mb-6">
        <Text type="title">Room ID</Text>

        <hr className="border-t border-t-white/25 flex-1" />

        <Input value={roomId ?? ""} readOnly />

        <button className="hover:bg-white/10 p-1 transition-colors">
          <Icon name="scroll" color="white" size={16} />
        </button>
      </header>

      <LobbySettings hasHostPermission={hasHostPermission} />

      {/* Members */}
      <div className="mt-6 mb-24">
        <Text type="title" className="mb-4">
          Members
        </Text>
        <div className="space-y-2">
          {members.map((member) => (
            <div key={member.id} className="flex items-center gap-2 bg-black border border-white/20 p-2">
              <div className="w-8 h-8 border border-white flex-shrink-0"></div>

              <Text>{member.username}</Text>

              {member.isHost && <Icon name="crown" color="white" size={16} />}
              {member.isYou && <YouBadge />}
              {hasHostPermission && <Button className="ms-auto" size="sm" type="outlined" icon="cross" />}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto flex gap-2 fixed bottom-6 left-6 right-6">
        <Button icon="logout" type="outlined" color="white" />
        <Button color="primary" className="flex-1 mr-12" disabled={!hasHostPermission} onClick={handleStartGame}>
          Start game
        </Button>
      </div>
    </div>
  );
}
