import { Router } from "express";

import { userController } from "../controllers";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.get("/", userController.getAll);
router.post("/", userMiddleware.isValidCreate, userController.create);

router.get(
  "/:userId",
  userMiddleware.isValidId,
  userMiddleware.getByIdOrThrow,
  userController.getById
);
router.patch(
  "/:userId",
  userMiddleware.isValidId,
  userMiddleware.isValidUpdate,
  userMiddleware.getByIdOrThrow,
  userController.update
);
router.delete(
  "/:userId",
  userMiddleware.isValidId,
  userMiddleware.getByIdOrThrow,
  userController.delete
);

export const userRouter = router;
