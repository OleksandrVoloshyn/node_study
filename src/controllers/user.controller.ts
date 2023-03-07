import { NextFunction, Request, Response } from "express";

import { User } from "../models";
import { ICommonResponse, IRequestWithUser, IUser } from "../types";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      return res.json(req.user);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IUser>>> {
    try {
      const user = await User.create(req.body);
      return res.status(201).json({
        message: "User has been created",
        data: user,
      });
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IUser>>> {
    try {
      const { pk } = req.params;
      const updatedUser = await User.findByIdAndUpdate(pk, { ...req.body });

      return res.json({
        message: "User has been updated",
        data: updatedUser,
      });
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const user = req.user;
      await User.deleteOne(user);
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
