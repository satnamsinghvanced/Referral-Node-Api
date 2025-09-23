import cors from "cors";

const corsOptions = {
  origin: ["",""], 
  methods: ["GET", "POST", "PUT", "PATCH","DELETE",],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
