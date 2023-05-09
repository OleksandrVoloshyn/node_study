import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";
import { User } from "../models";
import { IRequest } from "../types";
import { UserValidator } from "../validators";

class UserMiddleware {
  public async getByIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) return next(new ApiError("User not found", 422));

      req.res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  public getDynamicallyAndThrow(
    fieldName: string,
    from = "body",
    dbField: string = fieldName
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];

        const user = await User.findOne({ [dbField]: fieldValue });
        if (user) {
          next(
            new ApiError(
              `User with ${fieldName}  ${fieldValue} already exist`,
              409
            )
          );
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public getDynamicallyOrThrow(
    fieldName: string,
    from = "body",
    dbField: string = fieldName
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];

        const user = await User.findOne({ [dbField]: fieldValue });
        if (!user) {
          next(new ApiError("User not found", 422));
        }

        req.res.locals = user;
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public async isValidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.create.validate(req.body);
      if (error) return next(new ApiError(error.message, 400));

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.update.validate(req.body);
      if (error) return next(new ApiError(error.message, 400));

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error } = UserValidator.login.validate(req.body);
      if (error) return next(new ApiError(error.message, 400));

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      if (!isObjectIdOrHexString(userId))
        return next(new ApiError("ID is not valid", 400));
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
