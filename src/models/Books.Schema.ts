import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Book {
    @Prop({unique:true, required:true})
    id: number;

    @Prop()
    title: string;

    @Prop()
    author: string;

    @Prop()
    price: number;

    @Prop()
    category: string;

    @Prop()
    publication_date: string;
}

export const bookSchema = SchemaFactory.createForClass(Book)