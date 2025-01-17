import Player from "../game/player";
import { SocketType } from "@/types/socket";
import jwt from "jsonwebtoken";

export default function authLogin(socket: SocketType) {
  socket.on("auth:login", (token?: string) => {
    if (!token) return;

    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };

      Player.get(userId)?.loginSocket(socket.id);
    } catch (error) {
      console.log(error);
    }
  });
}
