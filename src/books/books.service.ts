
import { Injectable, Query } from "@nestjs/common";
import { booksData } from "src/dummydata/books";
import { Book } from "./interfaces/books.interface";

@Injectable()
export class BooksService {

    books: Book[] = booksData;
    filteredBooks :Book[];
    getAllBooks(params?:any): Book[]{

        if(params.price){
             this.filteredBooks = this.books.filter(book => book.price == params.price)
        }

        if(params.category){
            this.filteredBooks =this.books.filter(book=> book.category == params.category)
        }

        return this.filteredBooks;
    }

    getBookById(id:number): Book{
        return this.books.find(book => book.id === id);
    }
}