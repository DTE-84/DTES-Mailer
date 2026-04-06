import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
export const handleOutreachBroadcast = async (req, res) => {
    const { subject, message, leads } = req.body;
    if (!subject || !message || !leads || !Array.isArray(leads)) {
        return res.status(400).json({ error: "Missing protocol parameters (Subject, Message, or Leads)." });
    }
    const logPath = path.resolve(__dirname, "../../db/outreach_log.txt");
    const timestamp = new Date().toISOString();
    // LOGGING THE TRANSMISSION
    const logEntry = `[${timestamp}] BROADCAST DEPLOYED\nSubject: ${subject}\nLead Count: ${leads.length}\nMessage Preview: ${message.substring(0, 50)}...\n-------------------\n`;
    try {
        // Ensure DB dir exists
        const dbDir = path.dirname(logPath);
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }
        fs.appendFileSync(logPath, logEntry);
        let broadcastStatus = "Staging Mode: Logged to file.";
        if (resend) {
            // PRO BROADCAST: Real email delivery
            // We'll batch these in 100s for high-fidelity throughput
            const batchSize = 100;
            for (let i = 0; i < leads.length; i += batchSize) {
                const batch = leads.slice(i, i + batchSize);
                await Promise.all(batch.map(lead => resend.emails.send({
                    from: "DTE Solutions <outreach@dte-solutions.icu>",
                    to: lead.email,
                    subject: subject,
                    text: message,
                })));
            }
            broadcastStatus = "Pro Broadcast: Delivered via DTE Managed Relay.";
        }
        res.json({
            status: "Success",
            message: broadcastStatus,
            deliveryCount: leads.length,
            trackingId: `DTE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        });
    }
    catch (err) {
        console.error("Outreach Log Error:", err);
        res.status(500).json({ error: "System Integrity Breach: Could not process broadcast." });
    }
};
