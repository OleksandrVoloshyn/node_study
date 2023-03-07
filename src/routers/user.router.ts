import { Router } from "express";

import { userController } from "../controllers";
import { userMiddleware } from "../middlewares";

const router = Router();

router.get("/", userController.getAll);
router.post("/", userMiddleware.validateUser, userController.create);

router.get("/:pk", userMiddleware.checkIsUserExist, userController.getById);
router.put("/:pk", userMiddleware.checkIsUserExist, userMiddleware.validateUser, userController.update);
router.delete("/:pk", userMiddleware.checkIsUserExist, userController.delete);

export const userRouter = router;
