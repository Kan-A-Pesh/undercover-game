import Player from "@/game/player";
import { SocketType } from "#/socket";
import jwt from "jsonwebtoken";

export default function join(socket: SocketType) {
  socket.on("room:join", (token?: string) => {
    if (!token) return;

    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };

      Player.get(userId)?.loginSocket(socket.id);
    } catch (error) {
      //TODO: handle error
      console.error(error);
    }
  });
}
