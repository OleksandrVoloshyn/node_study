import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { User } from "../models";
import { IRequestWithUser, IUser } from "../types";

class UserMiddleware {
  public async checkIsUserExist(
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { pk } = req.params;
      if (pk.length != 24) {
        throw new ApiError("Wrong id", 400);
      }

      const user = await User.findById(pk);
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      req.user = user as IUser;
      next();
    } catch (e) {
      next(e);
    }
  }

  public validateUser(req: Request, res: Response, next: NextFunction): void {
    try {
      const { email, password, name, age } = req.body;

      if (req.method != "PUT" && (!email || !password)) {
        throw new ApiError("email or password is required", 400);
      }
      if (name && name.length < 3) {
        throw new ApiError("name must have at least 3 symbols", 400);
      }
      if (age && +age <= 0) {
        throw new ApiError("age must be more then 0", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
