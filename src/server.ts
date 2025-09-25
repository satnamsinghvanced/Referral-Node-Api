import express from "express";
import dotenv from "dotenv";
import { main } from "./constant/main.ts";
import ConnectDB from "./config/db.ts";
import corsMiddleware from "./config/index.ts";
import router from "./routes/routes.ts";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();
const { SERVER_RUNNING, HEALTH_ROUTE_OK } = main;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ConnectDB();
app.use(corsMiddleware);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use("/api", router);
app.get("/", (_, res) => {
  res.send(HEALTH_ROUTE_OK);
});

const PORT = process.env.PORT || 8001;


app.listen(PORT, () => {
  console.log(`${SERVER_RUNNING} http://localhost:${PORT}`);
});
