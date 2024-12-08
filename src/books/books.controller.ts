import { Controller, Get } from "@nestjs/common";

@Controller('/books')
export class BooksController{
    constructor(){}

    @Get()
    getAllBooks(){
        return 'getting all books';
    }

    @Get(':id')
    getBookById(){
        return 'Got one book by id'
    }

}