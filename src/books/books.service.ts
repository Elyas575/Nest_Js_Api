
import { Injectable, Query } from "@nestjs/common";
import { booksData } from "../dummydata/books";
import { Book } from "./interfaces/books.interface";
import { GetAllBooksParamsDto } from "./dtos/get-all-books.dto";

@Injectable()
export class BooksService {
// to do: refactor the code later maybe use a switch case or a generic function
    books: Book[] = booksData;
    getAllBooks(params?:GetAllBooksParamsDto): Book[]{
        let filteredBooks :Book[] = booksData;

        if(!params){
            return filteredBooks;
        }

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