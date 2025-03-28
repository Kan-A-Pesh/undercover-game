import GameChat from "@/components/layout/game/chat";
import socket from "@/socket";
import { useEffect, useState } from "react";
import LobbyScreen from "./game/lobby";
import WordAttributionScreen from "./game/word-attribution";
import { RoomName } from "#/models/room-name";
import WordChoosingScreen from "./game/word-choosing";
import useRoomStore from "@/store/room";
import PostResultsScreen from "./game/post-results";

export default function GameScreen() {
  const [gameState, setGameState] = useState(RoomName.Setup);
  const [gameRound, setGameRound] = useState(0);
  const setRoomTimerEnd = useRoomStore((state) => state.setRoomTimerEnd);
  const resetForNewRound = useRoomStore((state) => state.resetForNewRound);
  const resetForNewGame = useRoomStore((state) => state.resetForNewGame);

  useEffect(() => {
    socket.on("game:state:updated", (state, duration) => {
      if (state === RoomName.PostResults) {
        setGameRound((prev) => prev + 1);
        resetForNewRound();
      }

      if (state === RoomName.Setup) {
        resetForNewGame();
      }

      setGameState(state);
      setRoomTimerEnd(duration ?? -1);
    });

    return () => {
      socket.off("game:state:updated");
    };
  }, [setRoomTimerEnd, resetForNewRound, resetForNewGame]);

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col gap-8">
      {gameState === RoomName.Setup && <LobbyScreen />}
      {gameState === RoomName.WordAttribution && <WordAttributionScreen />}

      {(gameState === RoomName.WordChoosing ||
        gameState === RoomName.Debate ||
        gameState === RoomName.Voting ||
        gameState === RoomName.VoteResults) && <WordChoosingScreen state={gameState} key={gameRound} />}

      {gameState === RoomName.PostResults && <PostResultsScreen />}

      <GameChat />
    </div>
  );
}
