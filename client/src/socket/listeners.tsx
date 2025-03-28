import { useEffect } from "react";
import socket from ".";
import usePlayersStore from "@/store/players";
import useRoomStore from "@/store/room";

export default function SocketListeners() {
  const setPlayers = usePlayersStore((state) => state.setPlayers);
  const setMyWord = useRoomStore((state) => state.setMyWord);

  useEffect(() => {
    socket.on("room:players:updated", (players) => {
      setPlayers(players);
    });

    socket.on("game:word:attribution", (word) => {
      setMyWord(word);
    });

    return () => {
      socket.off("room:players:updated");
      socket.off("game:word:attribution");
    };
  }, [setPlayers, setMyWord]);

  return null;
}
