import { HttpError } from "../errors/http-error"; 
import { BlogRepository } from "../repositories/blog.repository";

const blogRepository = new BlogRepository();

export class BlogService {
    async createBlog(blogData: any) { // paxi yeta DTO ko halne.. aaile lai any nai chodeko
        const newBlog = await blogRepository.create(blogData);
        return newBlog;
    }

    async getAllBlogs() {
        const blogs = await blogRepository.getAll();
        return blogs;
    }
}