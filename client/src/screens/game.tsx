import GameChat from "@/components/layout/game/chat";
import socket from "@/socket";
import { useEffect, useState } from "react";
import LobbyScreen from "./game/lobby";
import WordAttributionScreen from "./game/word-attribution";
import { RoomName } from "#/models/room-name";

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

  let GameState = null;

  switch (gameState) {
    case RoomName.Setup:
      GameState = LobbyScreen;
      break;
    case RoomName.WordAttribution:
      GameState = WordAttributionScreen;
      break;
  }

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col gap-8">
      {GameState && <GameState />}

      <GameChat />
    </div>
  );
}
