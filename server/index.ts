import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleOutreachBroadcast } from "./routes/outreach";

const app = express();
const port = process.env.PORT || 8001; // Dedicated port for dtes-mailer

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Core API
app.get("/api/ping", (_req, res) => {
  res.json({ message: "dtes-mailer heartbeat active." });
});

app.post("/api/outreach/broadcast", handleOutreachBroadcast);

app.listen(port, () => {
  console.log(`🚀 dtes-mailer engine running on port ${port}`);
  console.log(`🔧 Outreach API: http://localhost:${port}/api/outreach`);
});
