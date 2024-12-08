
import { Injectable, Query } from "@nestjs/common";
import { booksData } from "src/dummydata/books";
import { Book } from "./interfaces/books.interface";

@Injectable()
export class BooksService {

    books: Book[] = booksData;
    getAllBooks(params?:any): Book[]{
        console.log(params)
        if(params.price){
            return this.books.filter(book => book.price === params.price)
        }

        if(params.category){
            return this.books.filter(books=> books.category === params.category)
        }

        

        return this.books;
    }

    getBookById(id:number): Book{
        return this.books.find(book => book.id === id);
    }
}