import dotenv from "dotenv";
import path from "path";

// Load the .env from the Backend directory explicitly so cwd doesn't matter
const envPath = "C:/Users/anany/OneDrive/RouteLens/Backend/.env";
console.log("[run_with_env] loading env from:", envPath);
dotenv.config({ path: envPath });

// Now import the server (it will run on import)
import("./server.js").catch((err) => {
  console.error("Error importing server.js:", err);
  process.exit(1);
});
