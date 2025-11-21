import { Router, Request, Response } from 'express';
import { BookController } from '../controllers/book.controller';

const bookController = new BookController();

const router: Router = Router();

router.get('/', bookController.getBooks);

// make a router that handles GET request that takes bookid
// /:bookid and calls bookController.getBookById


export default router;