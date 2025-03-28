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
import { RoomName } from "#/models/room-name";
import Button from "@/components/ui/button";
import DebateModal from "@/components/layout/game/debate-modal";
import VoteModal from "@/components/layout/game/vote-modal";
import { useEffect, useState } from "react";
import Clock from "@/components/layout/game/clock";
import { getEliminatedQuote } from "@/utils/quotes";

export default function WordChoosingScreen({ state }: { state: RoomName }) {
  const { myWord, chosenWords, choosingPlayerId } = useRoomStore();
  const [vote, setVote] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteResults, setVoteResults] = useState<{ [key: string]: number }>({});
  const players = usePlayersStore((state) => state.players);
  const myId = useMyProfileStore((state) => state.id);
  const addEliminatedPlayerId = useRoomStore((state) => state.addEliminatedPlayerId);
  const eliminatedPlayerIds = useRoomStore((state) => state.eliminatedPlayerIds);
  const [currentlyEliminatedPlayerId, setCurrentlyEliminatedPlayerId] = useState<string | null>(null);

  const handleConfirmVote = () => {
    if (!vote) return;

    socket.emit("game:voting:vote", { vote }, (response) => {
      if (!response.success) return console.error(response.error);
      setHasVoted(true);
    });
  };

  const handleWordChosen = (word: string) => {
    socket.emit("game:word:choose", { word }, (response) => {
      if (!response.success) console.error(response.error);
    });
  };

  useEffect(() => {
    socket.on("game:vote:results", (results, eliminatedPlayerId) => {
      setVoteResults(results);
      if (eliminatedPlayerId) {
        addEliminatedPlayerId(eliminatedPlayerId);
        setCurrentlyEliminatedPlayerId(eliminatedPlayerId);
      }
    });
  }, [addEliminatedPlayerId]);

  return (
    <>
      <header className="flex items-center">
        <div className="flex-1">
          <Text type="caption">{myWord ? "Your word is" : "You are"}</Text>
          <h1 className={clsx("font-body text-small-display mt-4 h-12", myWord ? "text-secondary" : "text-white")}>
            {myWord ?? "Mr. White"}
          </h1>
        </div>
        <Clock />
      </header>

      <hr className="border-white/50 my-4" />

      <div className="flex flex-col gap-6 overflow-y-auto mb-56">
        {players.map((player) => (
          <div
            key={player.id}
            className={clsx(
              "flex items-center gap-2",
              eliminatedPlayerIds.includes(player.id) && currentlyEliminatedPlayerId !== player.id && "opacity-50",
            )}
          >
            <div className="w-12 h-12 border border-white flex-shrink-0"></div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <Text className="mb-2">{player.username}</Text>
                {player.id === myId && <YouBadge />}
              </div>
              {eliminatedPlayerIds.includes(player.id) && currentlyEliminatedPlayerId !== player.id ? (
                <Text color="white" className="opacity-50">
                  {getEliminatedQuote(player.id)}
                </Text>
              ) : chosenWords[player.id] ? (
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

            {state === RoomName.Voting &&
              !eliminatedPlayerIds.includes(player.id) &&
              currentlyEliminatedPlayerId !== player.id && (
                <Button
                  size="sm"
                  color="primary"
                  type={vote === player.id ? "filled" : "outlined"}
                  className="animate-fadeLeft"
                  disabled={hasVoted}
                  icon={hasVoted && vote === player.id ? "cross" : undefined}
                  onClick={() => setVote(player.id)}
                >
                  Vote
                </Button>
              )}

            {state === RoomName.VoteResults && (
              <div className="flex gap-2">
                {Array.from({ length: voteResults[player.id] ?? 0 }).map((_, index) => (
                  <Icon
                    name="cross"
                    color="white"
                    className="animate-fadeLeft"
                    style={{ animationDelay: `${index * 0.5}s` }}
                    size={16}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {state === RoomName.WordChoosing && (
        <WordChoosingModal open={choosingPlayerId === myId} onWordChosen={handleWordChosen} />
      )}

      <DebateModal open={state === RoomName.Debate} />

      <VoteModal open={state === RoomName.Voting && !hasVoted} canConfirm={!!vote} onVoteSelected={handleConfirmVote} />
    </>
  );
}
