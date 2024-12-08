
import { Injectable, Query } from "@nestjs/common";
import { booksData } from "src/dummydata/books";
import { Book } from "./interfaces/books.interface";

@Injectable()
export class BooksService {

    books: Book[] = booksData;
    getAllBooks(price?:number): Book[]{
        console.log(price)
        if(price){
            return this.books.filter(book => book.price === price)
        }

        return this.books;
    }

    getBookById(id:number): Book{
        return this.books.find(book => book.id === id);
    }
}