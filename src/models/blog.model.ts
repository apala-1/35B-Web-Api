import mongoose, { Schema, Model } from "mongoose";
import { CreateBlogDTO } from "../types/blog.type";

export interface IBlog extends Omit<CreateBlogDTO, 'authorId'> {
    _id: mongoose.Types.ObjectId;
    authorId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
const BlogSchema: Schema = new Schema<IBlog>(
    {
        title: { type: String, required: true, maxlength: 200 },
        content: { type: String, required: true },
        authorId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: true,
    }
);
export const BlogModel: Model<IBlog> = mongoose.model<IBlog>('Blog', BlogSchema);