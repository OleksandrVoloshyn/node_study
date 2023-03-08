import { Router } from "express";

import { userController } from "../controllers";
import { userMiddleware } from "../middlewares";

const router = Router();

router.get("/", userController.getAll);
router.post("/", userMiddleware.isUserValidCreate, userController.create);

router.get(
  "/:pk",
  userMiddleware.isUserIdValid,
  userMiddleware.getByIdOrThrow,
  userController.getById
);
router.put(
  "/:pk",
  userMiddleware.isUserIdValid,
  userMiddleware.isUserValidUpdate,
  userMiddleware.getByIdOrThrow,
  userController.update
);
router.delete(
  "/:pk",
  userMiddleware.isUserIdValid,
  userMiddleware.getByIdOrThrow,
  userController.delete
);

export const userRouter = router;
