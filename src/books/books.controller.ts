import { BooksService } from './books.service';
import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";

@Controller('/books')
export class BooksController{
    constructor(private readonly _booksService:BooksService){}

    @Get()
    getAllBooks(){
        return this._booksService.getAllUsers();
    }

    @Get('/:id')
    getBookById(@Param('id', ParseIntPipe) bookId:number ):any  {
        return this._booksService.getUserById(bookId);
    }

}