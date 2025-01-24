import 'dotenv/config'
import 'tsconfig-paths/register';
import { SocketType } from "#/socket";
import { io } from "./server";
import { glob } from "glob";
import path from "path";

io.on("connection", async (socket) => {
  // Register events
  const res = await glob(__dirname + "/events/**/*.ts");
  const modules = (await Promise.all(
    res.map((file) => import(path.join(__dirname,"/../",file.replace(".ts", "")))),
  )) as {
    default: (s: SocketType) => void
  }[];

  for (const module of modules) module.default(socket);
});

io.listen(3002);
