import Icon from "@/components/icon";
import WordChoosingModal from "@/components/layout/game/word-choosing-modal";
import YouBadge from "@/components/layout/you-badge";
import Message from "@/components/ui/message";
import Text from "@/components/ui/text";
import socket from "@/socket";
import useMyProfileStore from "@/store/my-profile";
import usePlayersStore from "@/store/players";
import useRoomStore from "@/store/room";
import clsx from "clsx";
import { useEffect } from "react";
import { RoomName } from "#/models/room-name";

export default function WordChoosingScreen({ state }: { state: RoomName }) {
  const { myWord, chosenWords, choosingPlayerId, setChosenWord, setChoosingPlayerId } = useRoomStore();

  const players = usePlayersStore((state) => state.players);
  const myId = useMyProfileStore((state) => state.id);

  useEffect(() => {
    socket.on("game:word:choosing", (playerId) => {
      setChoosingPlayerId(playerId);
    });

    socket.on("game:word:chosen", (playerId, word) => {
      setChosenWord(playerId, word);
    });

    return () => {
      socket.off("game:word:choosing");
      socket.off("game:word:chosen");
    };
  }, [setChoosingPlayerId, setChosenWord]);

  const handleWordChosen = (word: string) => {
    socket.emit("game:word:choose", { word }, (response) => {
      if (!response.success) console.error(response.error);
    });
  };

  return (
    <>
      <header className="flex items-center">
        <div className="flex-1">
          <Text type="caption">{myWord ? "Your word is" : "You are"}</Text>
          <h1 className={clsx("font-body text-small-display mt-4 h-12", myWord ? "text-secondary" : "text-white")}>
            {myWord ?? "Mr. White"}
          </h1>
        </div>
        <div className="p-3 py-0.5 bg-primary">
          <Text type="caption">00:00</Text>
        </div>
      </header>

      <hr className="border-white/50 my-4" />

      <div className="flex flex-col gap-6 overflow-y-auto mb-56">
        {players.map((player) => (
          <div key={player.id} className="flex items-center gap-2">
            <div className="w-12 h-12 border border-white flex-shrink-0"></div>
            <div className="flex-1">
              <Text className="mb-2">{player.username}</Text>
              {chosenWords[player.id] ? (
                <Message>
                  <Text color="black">{chosenWords[player.id]}</Text>
                </Message>
              ) : player.id === choosingPlayerId ? (
                <Message>
                  <div className="flex gap-2">
                    <div className="w-1 h-1 bg-primary animate-bounce -animation-delay-400"></div>
                    <div className="w-1 h-1 bg-primary animate-bounce -animation-delay-200"></div>
                    <div className="w-1 h-1 bg-primary animate-bounce"></div>
                  </div>
                </Message>
              ) : (
                <Icon name="zzz" color="white" className="opacity-25" size={24} />
              )}
            </div>
            {player.id === myId && <YouBadge />}
          </div>
        ))}
      </div>

      {state === RoomName.WordChoosing && (
        <WordChoosingModal open={choosingPlayerId === myId} onWordChosen={handleWordChosen} />
      )}
    </>
  );
}
