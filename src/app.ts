import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./configs";
import { authRouter, userRouter } from "./routers";
import { IError } from "./types";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  return res.status(status).json({
    status,
    message: err.message || "unknown error",
  });
});

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL).then();
  // eslint-disable-next-line no-console
  console.log(`Server has started on PORT:${configs.PORT}`);
});
