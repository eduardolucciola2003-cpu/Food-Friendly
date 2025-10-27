// @ts-nocheck

import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check for Render
app.get("/api/health", (_req, res) => {
  res.json({ ok: true }); // JS boolean is `true`, not `True`
});

// Optional test
app.get("/api/test", (_req, res) => {
  res.json({ message: "Backend working ✅" });
});

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
