
import { Injectable, Query } from "@nestjs/common";
import { booksData } from "src/dummydata/books";
import { Book } from "./interfaces/books.interface";
import { GetAllBooksDto } from "./interfaces/dtos/get-all-books.dto";

@Injectable()
export class BooksService {

    books: Book[] = booksData;
    getAllBooks(params?:GetAllBooksDto): Book[]{
        let filteredBooks :Book[] = booksData;

        if(params.price){
             filteredBooks = this.books.filter(book => book.price === Number(params.price))
        }

        if(params.category){
            filteredBooks = filteredBooks.filter(book => book.category.toLowerCase() === params.category.toLowerCase())
        }

        if(params.author){
            filteredBooks = filteredBooks.filter(book => book.author.toLowerCase() === params.author.toLowerCase())
        }

        if(params.title){
            filteredBooks = filteredBooks.filter(book => book.title.toLowerCase() === params.title.toLowerCase())
        }
     
        if(params.date){
            // check if it's a year or a full date
            const year = params.date.length === 4;

            if(year){
             // Extract the year from the params.date
            filteredBooks = filteredBooks.filter(book => {
                // Extract year from the book's publicationDate
                const bookYear = book.publication_date.slice(0, 4);
                return bookYear === params.date;
             });
            } else {
                filteredBooks = filteredBooks.filter(book => book.publication_date === params.date);
            }
        } 
        return filteredBooks;
    }

    getBookById(id:number): Book{
        return this.books.find(book => book.id === id);
    }
}