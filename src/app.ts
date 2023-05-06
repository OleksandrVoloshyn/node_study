import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/configs";
import { userRouter } from "./routers/user.router";
import { IError } from "./types/common.types";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 400;

  return res.status(status).json({ message: err.message });
});

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log("Server has started on port " + configs.PORT);
});
