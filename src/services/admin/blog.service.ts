import { BlogRepository } from "../../repositories/blog.repository";
const blogRepository = new BlogRepository();

export class AdminBlogService {
    async getAllBlogs(page?: string, size?: string, search?: string) {
        const pageNumber = page ? parseInt(page, 10) : 1;
        const pageSize = size ? parseInt(size, 10) : 10;
        
        const { blogs, total } = await blogRepository.getAllPaginated(pageNumber, pageSize, search);
        const pagination = {
            page: pageNumber,
            size: pageSize,
            total,
            totalPages: Math.ceil(total / pageSize),
        };
        return { blogs, pagination }
    }
    async deleteBlog(id: string) {
        const isDeleted = await blogRepository.delete(id);
        return isDeleted;
    }
}