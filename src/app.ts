import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { User } from "./models/User.model";
import { IUser } from "./types/user.types";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    const users = await User.find();
    return res.status(200).json(users);
  }
);

app.post(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    const { name, age, gender } = req.body;

    if (!name || name.length < 2) {
      res.status(400).json("Wrong name");
    }
    if (!age || Number.isInteger(age) || Number.isNaN(age)) {
      res.status(400).json("Wrong age");
    }
    if (!gender || (gender !== "male" && gender !== "female")) {
      res.status(400).json("Wrong age");
    }

    const user = await User.create({ ...req.body });
    return res.status(201).json(user);
  }
);

app.get(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      res.status(422).json("User with this id -> " + userId + " not found");
    }

    return res.status(200).json(user);
  }
);

app.patch(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    const { userId } = req.params;
    const { name, age, gender } = req.body;

    if (name && name.length < 2) {
      res.status(400).json("Wrong name");
    }
    if ((age && Number.isInteger(age)) || Number.isNaN(age)) {
      res.status(400).json("Wrong age");
    }
    if (gender && gender !== "male" && gender !== "female") {
      res.status(400).json("Wrong age");
    }

    const updatedUser = await User.updateOne({ _id: userId }, req.body);
    return res.status(200).json(updatedUser);
  }
);

app.delete("/users/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  await User.deleteOne({ _id: userId });
  return res.sendStatus(204);
});

app.listen(PORT, () => {
  mongoose.connect("mongodb://127.0.0.1:21017/study");
  console.log("Server has started on port " + PORT);
});
