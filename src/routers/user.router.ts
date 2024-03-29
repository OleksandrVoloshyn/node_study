import { Router } from "express";

import { userController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware, fileMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.get("/", userController.getAll);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.getById
);
router.patch(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
  userMiddleware.getByIdOrThrow,
  userController.update
);
router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.delete
);

router.put(
  "/:userId/avatar",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  fileMiddleware.isAvatarValid,
  userMiddleware.getByIdOrThrow,
  userController.uploadAvatar
);
router.delete(
  "/:userId/avatar",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.deleteAvatar
);

export const userRouter = router;
