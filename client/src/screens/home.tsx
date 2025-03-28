import Hat from "@/assets/svgs/hat";
import { JoinRoomModal } from "@/components/modals/join-room";
import Button from "@/components/ui/button";
import Text from "@/components/ui/text";
import socket from "@/socket";
import useRouterStore from "@/store/router";
import useMyProfileStore from "@/store/my-profile";
import { useState } from "react";
import Input from "@/components/ui/input";
import useSettingsStore from "@/store/settings";
import useRoomStore from "@/store/room";

export default function HomeScreen() {
  // Rules
  const setRoute = useRouterStore((state) => state.setRoute);
  const handleReadRules = () => setRoute("rules");

  const myProfileStore = useMyProfileStore();
  const setSettings = useSettingsStore((state) => state.setSettings);
  const setRoomId = useRoomStore((state) => state.setRoomId);

  // Join Room
  const [isJoinRoomModalOpen, setIsJoinRoomModalOpen] = useState(false);

  const handleCreateOrJoinRoom = (code?: string) => {
    socket.emit(
      code ? "room:join" : "room:create",
      {
        roomId: code,
        username: myProfileStore.username,
        avatar: myProfileStore.avatar,
      },
      (response) => {
        if (!response.success) {
          console.error(response.error);
          return;
        }

        setSettings(response.data.gameSettings);
        setRoomId(response.data.roomId);

        myProfileStore.setId(response.data.playerId);
        setRoute("game");
      },
    );
  };

  return (
    <>
      <section className="flex flex-1 flex-col py-4 md:py-8 lg:py-16 px-4">
        <div className="flex flex-col items-center justify-center gap-1">
          <Hat className="h-24 text-white" />
          <Text type="display">UNDER</Text>
          <Text type="display">COVER</Text>
        </div>
        <main className="flex flex-1 flex-col items-center justify-center gap-4 max-w-64 mx-auto">
          <section className="flex-1 flex flex-col items-center justify-center gap-2 w-full">
            <div className="w-full p-1 border border-white/20 mb-2 flex gap-2 items-center">
              <div className="relative h-[34px] w-[34px] min-w-[34px] border border-white/30">
                <img src={myProfileStore.avatar} alt="" className="w-full h-full object-cover" />
              </div>

              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="w-full"
                value={myProfileStore.username}
                onChange={(e) => myProfileStore.setUsername(e.target.value)}
              />
            </div>

            <Button icon="login" onClick={() => setIsJoinRoomModalOpen(true)} className="w-full">
              Join a room
            </Button>
            <Button color="white" icon="plus" onClick={() => handleCreateOrJoinRoom()} className="w-full">
              Create a room
            </Button>
            <Button type="outlined" color="white" icon="scroll" onClick={handleReadRules} className="w-full">
              Read the rules
            </Button>
          </section>

          <section className="flex-1 flex flex-col justify-center gap-2">
            <Text type="title">What is Undercover?</Text>
            <Text type="paragraph">
              Undercover is a game where you play as a undercover agent. You will be given a list of people to choose
              from and you will have to guess who they are.
            </Text>
            <Text type="paragraph">
              Once you have guessed the correct person, you will be given a hint to help you in your next guess.
            </Text>
          </section>
        </main>
      </section>

      <JoinRoomModal
        isOpen={isJoinRoomModalOpen}
        onClose={() => setIsJoinRoomModalOpen(false)}
        onJoin={handleCreateOrJoinRoom}
      />
    </>
  );
}
