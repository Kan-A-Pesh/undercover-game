import GameChat from "@/components/layout/game/chat";
import socket from "@/socket";
import { useEffect, useState } from "react";
import LobbyScreen from "./game/lobby";
import WordAttributionScreen from "./game/word-attribution";
import { RoomName } from "#/models/room-name";
import WordChoosingScreen from "./game/word-choosing";

export default function GameScreen() {
  const [gameState, setGameState] = useState(RoomName.Setup);

  useEffect(() => {
    socket.on("game:state:updated", (state, duration) => {
      setGameState(state);
      console.log("Game state updated", state, duration);
    });

    return () => {
      socket.off("game:state:updated");
    };
  }, []);

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col gap-8">
      {gameState === RoomName.Setup && <LobbyScreen />}
      {gameState === RoomName.WordAttribution && <WordAttributionScreen />}

      {(gameState === RoomName.WordChoosing || gameState === RoomName.Debate || gameState === RoomName.Voting) && (
        <WordChoosingScreen state={gameState} />
      )}

      <GameChat />
    </div>
  );
}
