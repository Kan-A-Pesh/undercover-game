import useRoomStore from "@/store/room";
import usePlayersStore from "@/store/players";
import { useEffect, useMemo, useState } from "react";
import EliminatedResultsScreen from "./results/eliminated";
import NoVoteResultsScreen from "./results/no-vote";
import WinnerResultsScreen from "./results/winner";

export default function PostResultsScreen() {
  const winnerRole = useRoomStore((state) => state.winnerRole);
  const players = usePlayersStore((state) => state.players);
  const eliminatedPlayerIds = useRoomStore((state) => state.eliminatedPlayerIds);
  const [showWinner, setShowWinner] = useState(false);

  const lastEliminatedPlayer = useMemo(() => {
    return players.find((player) => player.id === eliminatedPlayerIds[0]);
  }, [players, eliminatedPlayerIds]);

  useEffect(() => {
    setTimeout(() => setShowWinner(true), 5000);
  }, []);

  if (showWinner) return <WinnerResultsScreen winnerRole={winnerRole} />;
  if (!lastEliminatedPlayer) return <NoVoteResultsScreen />;
  return <EliminatedResultsScreen player={lastEliminatedPlayer} />;
}
