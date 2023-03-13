import { Router } from "express";

import { userController } from "../controllers";
import { authMiddleware, userMiddleware } from "../middlewares";

const router = Router();

router.get("/", userController.getAll);

router.get(
  "/:pk",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.getById
);
router.put(
  "/:pk",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userMiddleware.isValidUpdate,
  userMiddleware.getByIdOrThrow,
  userController.update
);
router.delete(
  "/:pk",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.delete
);

export const userRouter = router;
