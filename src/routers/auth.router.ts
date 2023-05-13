import { Router } from "express";

import { authController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserValidator } from "../validators";
import { EActionTokenType } from "../enums";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.create),
  userMiddleware.getDynamicallyAndThrow("email"),
  authController.register
);

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.login
);

router.post(
  "/password/change",
  commonMiddleware.isBodyValid(UserValidator.changeUserPassword),
  authMiddleware.checkAccessToken,
  authController.changePassword
);

router.put(
  `/password/forgot/:token`,
  authMiddleware.checkActionToken(EActionTokenType.forgot),
  authController.setForgotPassword
);

router.post(
  "/activate",
  commonMiddleware.isBodyValid(UserValidator.emailValidator),
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.sendActivateToken
);

router.put(
  `/activate/:token`,
  authMiddleware.checkActionToken(EActionTokenType.activate),
  authController.activate
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);

export const authRouter = router;
