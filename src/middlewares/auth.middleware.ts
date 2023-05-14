import { NextFunction, Request, Response } from "express";

import { EActionTokenType, ETokenType } from "../enums";
import { ApiError } from "../errors";
import { Action, OldPassword, Token } from "../models";
import { passwordService, tokenService } from "../services";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");
      if (!accessToken) return next(new ApiError("No token", 401));
      const jwtPayload = tokenService.checkToken(accessToken);

      const tokenInfo = await Token.findOne({ accessToken });
      if (!tokenInfo) return next(new ApiError("Token is not valid", 401));

      req.res.locals = { tokenInfo, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");
      if (!refreshToken) return next(new ApiError("No token", 401));
      const jwtPayload = tokenService.checkToken(
        refreshToken,
        ETokenType.refresh
      );

      const tokenInfo = await Token.findOne({ refreshToken });
      if (!tokenInfo) return next(new ApiError("Token is not valid", 401));

      req.res.locals = { tokenInfo, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }

  public checkActionToken(type: EActionTokenType) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const actionToken = req.params.token;
        if (!actionToken) return next(new ApiError("No token", 401));

        const jwtPayload = tokenService.checkActionToken(actionToken, type);

        const tokenInfo = await Action.findOne({ actionToken });
        if (!tokenInfo) return next(new ApiError("Token not valid", 401));

        req.res.locals = { tokenInfo, jwtPayload };
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public async checkOldPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { body } = req;
      const { tokenInfo } = req.res.locals;

      const oldPasswords = await OldPassword.find({
        _user_id: tokenInfo._user_id,
      });

      if (!oldPasswords) return next();

      await Promise.all(
        oldPasswords.map(async (record: any) => {
          const isMatched = await passwordService.compare(
            body.password,
            record.password
          );
          if (isMatched) {
            return next(
              new ApiError("Your new password is the same as your old!", 409)
            );
          }
        })
      );

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
