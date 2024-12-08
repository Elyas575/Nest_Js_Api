
import { Injectable, Query } from "@nestjs/common";
import { booksData } from "src/dummydata/books";
import { Book } from "./interfaces/books.interface";

@Injectable()
export class BooksService {

    books: Book[] = booksData;
    

    getAllBooks(params?:any): Book[]{
        let filteredBooks :Book[] = booksData;

        if(params.price){
             filteredBooks = this.books.filter(book => book.price === Number(params.price))
        }

        if(params.category){
            filteredBooks = filteredBooks.filter(book => book.category.toLowerCase() === params.category.toLowerCase())
        }

        if(params.date){
            console.log(params.date)
            if(params.date.length === 4){
             // Extract the year from the params.date
            filteredBooks = filteredBooks.filter(book => {
                // Extract year from the book's publicationDate
                const bookYear = book.publication_date.slice(0, 4);
                return bookYear === params.date;
             });
            } 
            
            else {
                filteredBooks = filteredBooks.filter(book => book.publication_date == params.date);
            }
        } 

        return filteredBooks;
    }

    getBookById(id:number): Book{
        return this.books.find(book => book.id === id);
    }
}