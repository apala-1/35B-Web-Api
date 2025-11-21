import { Book } from "../types/book.type";

export const book: Book[] = [
    { id: "B-1", title: "1984" },
    { id: "B-2", title: "To Kill a Mockingbird", date: "2015-12-10" }
];

export interface IBookRepository {
    getAllBooks(): Book[];
    getBookById(id: string): Book | undefined;
    createBook(book: Book): Book;
}

export class BookRepository implements IBookRepository {
    getAllBooks(): Book[] {
        return book;
    }
    getBookById(id: string): Book | undefined {
        return book.find(bk => bk.id === id);
    }
    createBook(newBook: Book): Book {
        book.push(newBook);
        return newBook;
    } 
}

// example 
// export class PostRepository implements IBookRepository {
//     getAllBooks(): Book[] {
//         // logic to get books from database
//         // const data = db.query("SELECT * FROM books");
//         // return data;
//     }
// }