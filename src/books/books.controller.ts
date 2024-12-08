import { BooksService } from './books.service';
import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";

@Controller('/books')
export class BooksController{
    constructor(private readonly _booksService:BooksService){}

    @Get()
    getAllBooks(@Query('price',ParseIntPipe) price:number){
        return this._booksService.getAllBooks(price);
    }

    @Get('/:id')
    getBookById(@Param('id', ParseIntPipe) bookId:number ):any  {
        return this._booksService.getBookById(bookId);
    }

}