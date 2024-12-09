import { BooksService } from './books.service';
import { Controller, Get,Post, Param, ParseIntPipe, Query, NotFoundException, UsePipes, ValidationPipe, Body } from "@nestjs/common";
import { GetAllBooksParamsDto } from './dtos/get-all-books-params.dto';
import { Book } from './interfaces/book.interface';
import { CreateBookDto } from './dtos/create-book.dto';
import { GetBookDto } from './dtos/get-book.dto';

@Controller('/books')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true })) // Apply ValidationPipe here

export class BooksController{
    constructor(private readonly _booksService:BooksService){}

    // @Post()
    // createBook(@Body() CreateBookDto:any){
    //         return this._booksService.createBook(CreateBookDto)
    // }

    @Get()
    getAllBooksFromDb(){
        return this._booksService.getBooks();
    }

      /**
         * Route to search for books based on query parameters.
         * The query parameters (title, author, price, category, publication date.) are validated then passed to the BooksService to fetch the books
         * @param params - the optional query parameters for filtering the books
         * returns An array of books matching the search criteria
      */
    @Get('/search')
    getBooks(@Query() params?: GetAllBooksParamsDto) : Promise<GetBookDto[]>{
        const booksToFind  = this._booksService.getAllBooks(params);
        return booksToFind;   
    }
    /**
         * Route to get a specific book by its ID. the id is converted to int using the ParseIntPipe then passed to the bookService
         * @param bookId - The ID of the book to retrieve
         * if found returns The book with the specified ID
  
     */
    @Get('/:id')
    getBookById(@Param('id', ParseIntPipe) bookId:number ) : Promise<GetBookDto>  {
        const bookToFind =  this._booksService.getBookById(bookId);
        if (!bookToFind) {
            throw new NotFoundException(`Book with id ${bookId} not found.`);
        }
        return bookToFind;
    }

}