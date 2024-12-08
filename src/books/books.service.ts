
import { Injectable, Query } from "@nestjs/common";
import { booksData } from "src/dummydata/books";
import { Book } from "./interfaces/books.interface";

@Injectable()
export class BooksService {

    books: Book[] = booksData;
    getAllBooks(@Query('price') price?:number): Book[]{
        return this.books;
    }

    getBookById(id:number): Book{
        return this.books.find(book => book.id === id);
    }
}