import { success } from "zod";
import { AdminBlogService } from "../../services/admin/blog.service";
import { Request, Response } from "express";

const adminBlogService = new AdminBlogService();
interface QueryParams {
    page?: string;
    size?: string;
    search?: string;
}
export class AdminBlogController {
    async getAllBlogs(req: Request, res: Response) {
        try{
            const queryParams: QueryParams = req.query;
            const {blogs, pagination} = await adminBlogService.getAllBlogs(
                queryParams.page,
                queryParams.size,
                queryParams.search
            );
            return res.status(200).json({
                success: true,
                data: blogs,
                pagination
            });
        }catch(error: Error | any){
            return res
                .status(500).json({ 
                    success: false,
                    message: "Internal server error" });
        }
    }

    async deleteBlog(req: Request, res: Response) {
        try{
            const blogId = req.params.id;
            const isDeleted = await adminBlogService.deleteBlog(blogId);
            if(!isDeleted){
                return res.status(404).json({
                    success: false,
                    message: "Blog not found"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Blog deleted successfully"
            });
        }catch(error: Error | any){
            return res
                .status(500).json({ 
                    success: false,
                    message: "Internal server error" });
        }
    }
}