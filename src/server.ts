import express from "express";
import dotenv from "dotenv";
import { main } from "./constant/main.ts";
import ConnectDB from "./config/db.ts";
import corsMiddleware from "./config/index.ts";
import router from "./routes/routes.ts";
dotenv.config();

const app = express();
const { SERVER_RUNNING, HEALTH_ROUTE_OK } = main;

ConnectDB();

app.use(corsMiddleware);
app.use(express.json());
app.use("/api", router)
app.get("/", (_, res) => {
  res.send(SERVER_RUNNING);
});

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`${HEALTH_ROUTE_OK} http://localhost:${PORT}`);
});
