import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { handleOutreachBroadcast } from "./routes/outreach.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8001; // Dedicated port for dtes-mailer

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from the project root (where built files are placed)
const staticPath = path.resolve(__dirname, "..");
console.log(`📡 Serving static files from: ${staticPath}`);

app.use(express.static(staticPath));

// Core API
app.get("/api/ping", (_req, res) => {
  res.json({ 
    status: "active",
    engine: "dtes-mailer",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

app.post("/api/outreach/broadcast", handleOutreachBroadcast);

// Fallback for SPA routing
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  const indexPath = path.join(staticPath, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("DTES Mailer: System Breach - Application artifacts not found at root.");
  }
});

app.listen(port, () => {
  console.log(`🚀 dtes-mailer engine running on port ${port}`);
  console.log(`🔧 Outreach API: http://localhost:${port}/api/outreach`);
});
