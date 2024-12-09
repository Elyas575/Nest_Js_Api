import { Module } from "@nestjs/common";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";
import { MongooseModule } from "@nestjs/mongoose";
import { BookSchema, schema } from "src/models/Books.Schema";

@Module({
    controllers:[BooksController],
    providers:[BooksService],
    imports:[MongooseModule.forFeature([{
        name:BookSchema.name,
        schema:schema
    }])]
})

export class BooksModule{}