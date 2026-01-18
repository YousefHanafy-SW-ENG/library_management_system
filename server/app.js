import cors from "cors";
import helmet from "helmet";
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import rateLimit from "express-rate-limit";
import router from "./router.js";
import { API_BASE_PATH } from "../config/env/index.js";
import requestLogger from "../common/middleware/requestLogger/index.js";
import { errorHandler } from "../common/middleware/errorHandler/index.js";

const corsOptions = {
  origin: "*",
  maxAge: 3600,
};

const helmetOptions = {
  crossOriginResourcePolicy: { policy: "cross-origin" },
};

const app = express();
app.set("trust proxy", 1);
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
    errorCode: "RATE_LIMITED",
  },
});

app.use(helmet(helmetOptions));
app.use(compression());
app.use(requestLogger);
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(globalLimiter);
app.use(`${API_BASE_PATH}`, router);
app.use(errorHandler);

export default app;
