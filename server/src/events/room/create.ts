import Player from "@/game/player";
import { SocketType } from "#/socket";
import jwt from "jsonwebtoken";

export default function create(socket: SocketType) {
  socket.on("room:create", () => {
    const player = new Player();
    let token: string;
    try {
      token = jwt.sign({ userId: player.getId() }, process.env.JWT_SECRET!);
      player.createRoom();

    } catch (error) {
      //TODO: handle error
      console.error(error);
      return "";
    }

    return token;
  });
}