import { BooksService } from './books.service';
import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { GetAllBooksParamsDto } from './dtos/get-all-books.dto';
import { Book } from './interfaces/books.interface';

@Controller('/books')
export class BooksController{
    constructor(private readonly _booksService:BooksService){}

    @Get()
    getBooks(@Query() params?: GetAllBooksParamsDto) : Book[]{
        return this._booksService.getAllBooks(params);
    }

    @Get('/search') 
    searchBooks(@Query() params?: GetAllBooksParamsDto) : Book[]{
        return this._booksService.getAllBooks(params);
    }

    @Get('/:id')
    getBookById(@Param('id', ParseIntPipe) bookId:number ) : Book  {
        return this._booksService.getBookById(bookId);
    }

}