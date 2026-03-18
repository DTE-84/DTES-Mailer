import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { handleOutreachBroadcast } from "./routes/outreach.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8001; // Dedicated port for dtes-mailer

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from the frontend build
const distPath = path.resolve(__dirname, "../../dist");
app.use(express.static(distPath));

// Core API
app.get("/api/ping", (_req, res) => {
  res.json({ message: "dtes-mailer heartbeat active." });
});

app.post("/api/outreach/broadcast", handleOutreachBroadcast);

// Fallback for SPA routing
app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`🚀 dtes-mailer engine running on port ${port}`);
  console.log(`🔧 Outreach API: http://localhost:${port}/api/outreach`);
});
