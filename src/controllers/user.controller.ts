import { NextFunction, Request, Response } from "express";

import { User } from "../models/user.model";
import { IUser } from "../types/user.types";
import { userService } from "../services/user.service";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAll();
      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;
      const user = await userService.getById(userId);

      if (!user) {
        res.status(422).json("User with this id -> " + userId + " not found");
      }

      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
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
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
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
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      await User.deleteOne({ _id: userId });
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
