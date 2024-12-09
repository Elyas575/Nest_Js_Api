
import { Injectable } from "@nestjs/common";
import { booksData } from "../dummydata/books";
import { Book } from "./interfaces/book.interface";
import { GetAllBooksParamsDto } from "./dtos/get-all-books-params.dto";
import { IBookService } from "./interfaces/books.service.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BookSchema } from "../models/Books.Schema";
import { GetBookDto } from "./dtos/get-book.dto";
import {mapMongoDbBookToGetBookDto} from './helpers/mongodb-book-converter'


@Injectable()
export class BooksService implements IBookService {
    constructor(@InjectModel(BookSchema.name) private bookModel: Model<BookSchema>){ }
    books: Book[] = booksData;

    createBook(createBookDto: any){
        this.books.forEach(book =>{
            const newBook = new this.bookModel(book)
            return newBook.save();
        }) 
    }

    getBooks(){
        const booksFound = this.bookModel.find();
        return mapMongoDbBookToGetBookDto(booksFound)
    }
      /**
         * Retrieves a list of books, optionally filtered by query parameters.
         * If no parameters are provided all books are returned.
         * Filtering is done by checking each parameter (e.g., price, category, title) and applying it's filter
         * @param params - The optional query parameters for filtering books (price, category, author, title, date(publication date)).
         * returns An array of books that match the filter criteria.
      */
      async getAllBooks(params?: GetAllBooksParamsDto): Promise<GetBookDto[]> {
        // Resolve the query to an array using `await`
        let filteredBooks: any = await this.bookModel.find();  // This now returns an array of books

        // Filter by price if specified in the query parameters
        if (params?.price) {
            filteredBooks = filteredBooks.filter(book => book.price === Number(params.price));
        }

        // Filter by category if specified in the query parameters
        if (params?.category) {
            filteredBooks = filteredBooks.filter(book => book.category.toLowerCase() === params.category.toLowerCase());
        }

        // Filter by author if specified in the query parameters
        if (params?.author) {
            filteredBooks = filteredBooks.filter(book => book.author.toLowerCase() === params.author.toLowerCase());
        }

        // Filter by title if specified in the query parameters
        if (params?.title) {
            filteredBooks = filteredBooks.filter(book => book.title.toLowerCase() === params.title.toLowerCase());
        }

        // Filter by publication date if specified in the query parameters
        if (params?.date) {
            const year = params.date.length === 4;
            if (year) {
                filteredBooks = filteredBooks.filter(book => {
                    const bookYear = book.publication_date.slice(0, 4);
                    return bookYear === params.date;
                });
            } else {
                filteredBooks = filteredBooks.filter(book => book.publication_date === params.date);
            }
        }
        // Map the books to the GetBookDto
        const filteredBooksToReturn = filteredBooks.map(book => {
            // helper function that maps the object from mongo db to GetBookDto
          return mapMongoDbBookToGetBookDto(book)
        });

        return filteredBooksToReturn;
    }
    async getBookById(bookId: number): Promise<GetBookDto> {
        const bookFound = await this.bookModel.findOne({ id: bookId });
            // helper function that maps the object from mongo db to GetBookDto
        return mapMongoDbBookToGetBookDto(bookFound)
    }
}