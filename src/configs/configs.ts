import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.DB_URL || "mongodb://127.0.0.1:21017/study",
};
