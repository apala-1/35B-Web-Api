import { AdminBlogController } from "../../controllers/admin/blog.controller";
import { authorizedMiddleware, adminOnlyMiddleware } from "../../middlewares/authorized.middleware";
import { Router } from "express";

const adminBlogRoutes = new AdminBlogController();
const router = Router();
// use the middleware in all the routes of this router
router.use(authorizedMiddleware);
router.use(adminOnlyMiddleware);

router.get("/", adminBlogRoutes.getAllBlogs);
router.delete("/:id", adminBlogRoutes.deleteBlog);

export default router;