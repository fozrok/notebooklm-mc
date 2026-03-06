import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

import { submitOptIn } from "./ghl";

/** POST /api/register — forwards opt-in to GoHighLevel (webhook or Contacts API) */
async function handleRegister(
  req: express.Request,
  res: express.Response
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const firstName = typeof req.body?.firstName === "string" ? req.body.firstName.trim() : "";
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";

  if (!firstName || !email) {
    res.status(400).json({ error: "First name and email are required" });
    return;
  }

  try {
    await submitOptIn(firstName, email);
    res.status(201).json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("not configured")) {
      res.status(503).json({ error: "Registration not configured." });
      return;
    }
    console.error("Register error:", err);
    res.status(502).json({ error: "Registration service temporarily unavailable. Please try again." });
  }
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  app.post("/api/register", handleRegister);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
