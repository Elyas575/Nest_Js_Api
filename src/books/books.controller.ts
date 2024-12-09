import { BooksService } from './books.service';
import { Controller, Get, Param, ParseIntPipe, Query, NotFoundException, UsePipes, ValidationPipe } from "@nestjs/common";
import { GetAllBooksParamsDto } from './dtos/get-all-books.dto';
import { Book } from './interfaces/books.interface';

@Controller('/books')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true })) // Apply ValidationPipe here

export class BooksController{
    constructor(private readonly _booksService:BooksService){}

    @Get('/search') 
    getBooks(@Query() params?: GetAllBooksParamsDto) : Book[]{
        const booksToFind  = this._booksService.getAllBooks(params);
        return booksToFind;   
    }

    @Get('/:id')
    getBookById(@Param('id', ParseIntPipe) bookId:number ) : Book  {
        const bookToFind =  this._booksService.getBookById(bookId);
        if (!bookToFind) {
            throw new NotFoundException(`Book with id ${bookId} not found.`);
        }
        return bookToFind;
    }

}