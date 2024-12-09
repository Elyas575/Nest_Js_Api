
import { Injectable, Query } from "@nestjs/common";
import { booksData } from "../dummydata/books";
import { Book } from "./interfaces/book.interface";
import { GetAllBooksParamsDto } from "./dtos/get-all-books-params.dto";
import { IBookService } from "./interfaces/books.service.interface";

@Injectable()
export class BooksService implements IBookService {
    books: Book[] = booksData;
      /**
         * Retrieves a list of books, optionally filtered by query parameters.
         * If no parameters are provided all books are returned.
         * Filtering is done by checking each parameter (e.g., price, category, title) and applying it's filter
         * @param params - The optional query parameters for filtering books (price, category, author, title, date(publication date)).
         * returns An array of books that match the filter criteria.
      */
    getAllBooks(params?:GetAllBooksParamsDto): Book[]{
        let filteredBooks :Book[] = booksData;

        // If no parameters are provided, return the full list
        if(!params){
            return filteredBooks;
        }
        // Filter by price if specified in the query parameters
        if(params?.price){
             filteredBooks = this.books.filter(book => book.price === Number(params.price))
        }
        // Filter by category if specified in the query parameters
        if(params?.category){
            filteredBooks = filteredBooks.filter(book => book.category.toLowerCase() === params.category.toLowerCase())
        }
        // Filter by author if specified in the query parameters
        if(params?.author){
            filteredBooks = filteredBooks.filter(book => book.author.toLowerCase() === params.author.toLowerCase())
        }
        // Filter by title if specified in the query parameters
        if(params?.title){
            filteredBooks = filteredBooks.filter(book => book.title.toLowerCase() === params.title.toLowerCase())
        }
     
        // Filter by publication date if specified in the query parameters
        if(params?.date){
            // check if it's a year or a full date
            const year = params.date.length === 4;
           // If it's a year filter by the first 4 characters of the publication date
            if(year){
            filteredBooks = filteredBooks.filter(book => {
                const bookYear = book.publication_date.slice(0, 4);
                return bookYear === params.date;
             });
            } else { 
                // Otherwise filter by the full publication date
                filteredBooks = filteredBooks.filter(book => book.publication_date === params.date);
            }
        } 
        return filteredBooks;
    }
    getBookById(id:number): Book{
        return this.books.find(book => book.id === id);
        
    }
}