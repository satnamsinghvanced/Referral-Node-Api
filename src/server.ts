import express from "express";
import dotenv from "dotenv";
import { main } from "./constant/main.ts";
import ConnectDB from "./config/db.ts";
import corsMiddleware from "./config/index.ts";

dotenv.config();

const app = express();
const { server, healthRoute } = main;

ConnectDB();

app.use(corsMiddleware);
app.use(express.json());

app.get("/", (req, res) => {
  res.send( healthRoute );
});

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`🚀 ${server} http://localhost:${PORT}`);
});
