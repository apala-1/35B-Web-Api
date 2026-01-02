import { Router } from "express";
// import admin controller
import { AdminUserController } from "../../controllers/admin/user.controller";
import { adminOnlyMiddleware, authorizedMiddleware } from "../../middlewares/authorized.middleware";

let adminUserController = new AdminUserController();

const router = Router();

router.get("/:id", authorizedMiddleware, adminOnlyMiddleware, adminUserController.getOneUser);
// define admin user routes

export default router;