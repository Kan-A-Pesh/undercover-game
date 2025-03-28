import useRoomStore from "@/store/room";
import usePlayersStore from "@/store/players";

export default function PostResultsScreen() {
  const winnerRole = useRoomStore((state) => state.winnerRole);
  const players = usePlayersStore((state) => state.players);
  const eliminatedPlayerIds = useRoomStore((state) => state.eliminatedPlayerIds);

  return (
    <div className="text-white text-title">
      This is the post results screen, make it work, btw here is the winner: {winnerRole}, and the last eliminated
      player is {players.find((player) => player.id === eliminatedPlayerIds[0])?.username}
    </div>
  );
}
