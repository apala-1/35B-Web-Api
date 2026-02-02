import { Router } from "express";
import { BlogController } from "../controllers/blog.controller";
import { authorizedMiddleware } from "../middlewares/authorized.middleware";

const blogRoutes = Router();
const blogController = new BlogController();

blogRoutes.post("/", authorizedMiddleware, blogController.createBlog);
blogRoutes.get("/", blogController.getAllBlogs);

export default blogRoutes;