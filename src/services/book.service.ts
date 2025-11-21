import { IBookRepository, BookRepository } from "../repositories/book.repository";
import { Book } from "../types/book.type";
import { CreateBookDTO } from "../dtos/book.dto";
let bookRepository: IBookRepository = new BookRepository();
export class BookService {
    getBooks = (): Book[] => {
        // business logic/ transformation
        let transformedBooks =
            bookRepository
                .getAllBooks()
                .map(bk => {
                    return {
                        ...bk,
                        title: bk.title.toUpperCase()
                    }
                })
        return transformedBooks;
    }
    createBook = (bookData: CreateBookDTO): Book => {
        const newBook: Book =  { ...bookData };
        // same as { id: bookData.id, title: bookData.title }
        let existingBook = bookRepository.getBookById(newBook.id);
        if(existingBook){
            throw new Error("Book ID already exists");
        }
        return bookRepository.createBook(newBook);
    }
}