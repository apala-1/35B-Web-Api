import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.route';
import bookRoutes from './routes/book.route';
import authUserRoutes from './routes/admin/user.route';
import blogRoutes from './routes/blog.route';
import adminBlogRoutes from './routes/admin/blog.route';
import { connectToDatabase } from './database/mongodb';
import dotenv from 'dotenv';
import { PORT } from './config';
import path from "path";

dotenv.config();
// can use .env variable below this
console.log(process.env.PORT);

const app: Application = express();
// const PORT: number = 3000;

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(bodyParser.json());

app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/admin/users', authUserRoutes);
app.use('/api/admin/blogs', adminBlogRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// app.get('/api/books/', (req: Request, res: Response) => {
//     const books = [
//         { id: "B-1", title: "1984" },
//         { id: "B-2", title: "To Kill a Mockingbird", date: "2015-12-10" }
//     ];
//     res.status(200).json(books);
// });

async function startServer() {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

startServer();