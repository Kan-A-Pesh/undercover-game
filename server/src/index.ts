import "dotenv/config";
import "tsconfig-paths/register";

import { io } from "./server";
import { glob } from "glob";

io.on("connection", async (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Register events
  try {
    // Find all event files (using relative paths to avoid import issues)
    const eventFiles = await glob("**/events/**/*.ts", {
      cwd: __dirname,
      absolute: false,
    });

    // Import and register each event handler
    for (const file of eventFiles) {
      try {
        // Convert the path to a module path
        const modulePath = `./${file.replace(/\.ts$/, "")}`;

        // Dynamic import of the event module
        const eventModule = await import(modulePath);

        // Call the default export function with the socket
        if (typeof eventModule.default === "function") {
          eventModule.default(socket);
          console.log(`Registered event handler from ${file}`);
        } else {
          console.warn(`Event file ${file} does not export a default function`);
        }
      } catch (error) {
        console.error(`Error loading event handler from ${file}:`, error);
      }
    }
  } catch (error) {
    console.error("Error loading event handlers:", error);
  }

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

io.listen(parseInt(process.env.SOCKET_PORT || "3001"));
console.log(`Socket server listening on port ${process.env.SOCKET_PORT || "3001"}`);
