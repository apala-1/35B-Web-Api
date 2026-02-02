import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authorizedMiddleware } from "../middlewares/authorized.middleware";
import { uploads } from "../middlewares/upload.middleware";

let authController = new AuthController();
let router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
// add remaining routes like login, logout, etc

router.get("/whoami", authorizedMiddleware, authController.getOneUser);
router.put("/update-profile", 
            authorizedMiddleware, 
            uploads.single("image"), // image = fieldname in form-data
            authController.updateUser);

export default router;