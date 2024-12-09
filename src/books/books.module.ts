import { Module } from "@nestjs/common";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Book, bookSchema } from "src/models/Books.Schema";

@Module({
    controllers:[BooksController],
    providers:[BooksService],
    imports:[MongooseModule.forFeature([{
        name:Book.name,
        schema:bookSchema
    }])]
})

export class BooksModule{}