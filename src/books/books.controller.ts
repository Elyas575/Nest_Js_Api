import { BooksService } from './books.service';
import { Controller, Get } from "@nestjs/common";

@Controller('/books')
export class BooksController{
    constructor(private readonly _booksService:BooksService){}

    @Get()
    getAllBooks(){
        return this._booksService.getAllUsers();
    }

    @Get(':id')
    getBookById(){
        return 'Got one book by id'
    }

}