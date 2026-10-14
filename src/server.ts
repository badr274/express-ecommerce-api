import type { Server } from "node:http";
import app from "./app";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";

let server: Server | undefined;

process.on("unhandledRejection", (reason: unknown) => {
  console.error("UNHANDLED REJECTION! Shutting down...");
  console.error(reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    server = app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

void startServer();
