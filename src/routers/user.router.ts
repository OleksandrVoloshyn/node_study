import { Router } from "express";

import { userController } from "../controllers";
import { authMiddleware, userMiddleware } from "../middlewares";

const router = Router();

router.get("/", userController.getAll);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isValidId,
  userMiddleware.getByIdOrThrow,
  userController.getById
);
router.patch(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isValidId,
  userMiddleware.isValidUpdate,
  userMiddleware.getByIdOrThrow,
  userController.update
);
router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isValidId,
  userMiddleware.getByIdOrThrow,
  userController.delete
);

export const userRouter = router;
