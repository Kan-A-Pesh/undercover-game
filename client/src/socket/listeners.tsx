import { useEffect } from "react";
import socket from ".";
import usePlayersStore from "@/store/players";
import useRoomStore from "@/store/room";

export default function SocketListeners() {
  const setPlayers = usePlayersStore((state) => state.setPlayers);
  const setMyWord = useRoomStore((state) => state.setMyWord);
  const setChoosingPlayerId = useRoomStore((state) => state.setChoosingPlayerId);
  const setChosenWord = useRoomStore((state) => state.setChosenWord);
  const setRoomTimerEnd = useRoomStore((state) => state.setRoomTimerEnd);
  const setWinnerRole = useRoomStore((state) => state.setWinnerRole);

  useEffect(() => {
    socket.on("room:players:updated", (players) => {
      setPlayers(players);
    });

    socket.on("game:word:attribution", (word) => {
      setMyWord(word);
    });

    socket.on("game:word:choosing", (playerId, duration) => {
      setChoosingPlayerId(playerId);
      setRoomTimerEnd(duration);
    });

    socket.on("game:word:chosen", (playerId, word) => {
      setChosenWord(playerId, word);
    });

    socket.on("game:round:ended", (winnerRole) => {
      console.log("game:round:ended", winnerRole);
      setWinnerRole(winnerRole);
    });

    return () => {
      socket.off("room:players:updated");
      socket.off("game:word:attribution");
      socket.off("game:word:choosing");
      socket.off("game:word:chosen");
      socket.off("game:round:ended");
    };
  }, [setPlayers, setMyWord, setChoosingPlayerId, setChosenWord, setRoomTimerEnd, setWinnerRole]);

  return null;
}
