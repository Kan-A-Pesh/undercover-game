import Player from "@/game/player";
import { SocketType } from "#/socket";
import jwt from "jsonwebtoken";

export default function create(socket: SocketType) {
  //! blabla only used for Postman test, remove when done
  //TODO: remove blabla
  socket.on("room:create", (blabla, callback) => {
    const player = new Player();
    let token: string;
    try {
      token = jwt.sign({ userId: player.getId() }, process.env.JWT_SECRET!);
      player.createRoom();

      callback(token);
    } catch (error) {
      //TODO: handle error
      console.error(error);
    }
  });
}