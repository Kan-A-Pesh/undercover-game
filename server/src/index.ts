import { SocketType } from "@/types/socket";
import { io } from "./server";
import { glob } from "glob";

io.on("connection", async (socket) => {
  // Register events
  const res = await glob(__dirname + "/events/*.ts");
  const modules = (await Promise.all(
    res.map((file) => import(file.replace(__dirname, ".").replace(".ts", "")))
  )) as { default: (s: SocketType) => void }[];

  for (const module of modules) module.default(socket);
});

io.listen(3001);
