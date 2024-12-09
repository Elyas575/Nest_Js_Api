import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class BookSchema {
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

export const schema = SchemaFactory.createForClass(BookSchema)