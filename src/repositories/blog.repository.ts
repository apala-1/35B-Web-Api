import { QueryFilter } from "mongoose";
import { BlogModel, IBlog } from "../models/blog.model";
export interface IBlogRepository {
    create(blogData: any): Promise<IBlog>;
    getById(blogId: string): Promise<IBlog | null>;
    update(blogId: string, blogData: any): Promise<IBlog | null>;
    delete(blogId: string): Promise<boolean>;
    getAll(): Promise<IBlog[]>;
    getAllPaginated(page: number, size: number, search?: string)
        : Promise<{ blogs: IBlog[]; total: number }>;
}
export class BlogRepository implements IBlogRepository {
    async create(blogData: any): Promise<IBlog> {
        const blog = new BlogModel(blogData);
        const newBlog = await blog.save();
        return newBlog;
    }
    async getAllPaginated(page: number, size: number, search?: string){
        const query: QueryFilter<IBlog> = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ];
        }
        const total = await BlogModel.countDocuments(query);
        const blogs = await BlogModel.find(query)
            .skip((page - 1) * size)
            .limit(size)
            .populate('authorId', 'username email');
        return { blogs, total };
    }
    async getAll(): Promise<IBlog[]> {
        const blogs = await BlogModel.find()
            .populate('authorId', 'username email')
            // .populate('comments');
        return blogs;
    }
    async getById(blogId: string): Promise<IBlog | null> {
        const found = await BlogModel.findById(blogId)
            // .populate('authorId', 'username email');
        return found;
    }
    async update(blogId: string, blogData: any): Promise<IBlog | null> {
        const updated = await BlogModel.findByIdAndUpdate(blogId, blogData, { new: true });
        return updated;
    }
    async delete(blogId: string): Promise<boolean> {
        const deleted = await BlogModel.findByIdAndDelete(blogId);
        return deleted !== null;
    }
}