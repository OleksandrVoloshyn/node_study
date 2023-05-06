import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.get("/", userController.getAll);
router.post("/", userController.create);

router.get("/:userId", userMiddleware.getByIdAndThrow, userController.getById);
router.patch("/:userId", userController.update);
router.delete("/:userId", userController.delete);

export const userRouter = router;
