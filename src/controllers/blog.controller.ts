import { BlogService } from "../services/blog.service";
import { Request, Response, NextFunction } from "express";

const blogService = new BlogService();

export class BlogController {
    async createBlog(req: Request, res: Response, next: NextFunction) {
        try {
            const blogData = req.body;
            const userId = req.user?._id;
            blogData.authorId = userId;
            
            const newBlog = await blogService.createBlog(blogData);
            return res.status(201).json({ 
                success: true, data: newBlog, message: "Blog created successfully"
            });
        } catch (error: Error | any) {
            return res.status(error.statusCode ||500)
                .json({success: false, message: "Error creating blog", error });
        }
    }
    async getAllBlogs(req: Request, res: Response, next: NextFunction) {
        try {
            const blogs = await blogService.getAllBlogs();
            return res.status(200).json({ 
                success: true, data: blogs, message: "Blogs retrieved successfully"
            });
        } catch (error: Error | any) {
            return res.status(error.statusCode ||500)
                .json({success: false, message: "Error retrieving blogs", error });
        }
    }
}