import Player from "@/game/player";
import { SocketType } from "#/socket";
import jwt from "jsonwebtoken";

export default function create(socket: SocketType) {
  //arg(might use later hehe) needed to send info to client using callback
  socket.on("room:create", (arg, callback) => {
    const player = new Player("username", "avatar");
    let token: string;
    try {
      token = jwt.sign({ userId: player.getId() }, process.env.JWT_SECRET!);
      player.createRoom();
      const room = player.getRoom()!;
      socket.join(room.getId());

      //TODO: send player and room contexts to the client
      // Send the token back to the client
      callback(token);
    } catch (error) {
      //TODO: handle error
      console.error(error);
    }
  });
}