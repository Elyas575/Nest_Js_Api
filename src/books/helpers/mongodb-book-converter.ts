import { GetBookDto } from "../dtos/get-book.dto";

export function mapMongoDbBookToGetBookDto(bookFound: any): GetBookDto {
    const bookToReturn = new GetBookDto();
    bookToReturn.id = bookFound.id;
    bookToReturn.title = bookFound.title;
    bookToReturn.author = bookFound.author;
    bookToReturn.price = bookFound.price;
    bookToReturn.category = bookFound.category;
    bookToReturn.publication_date = bookFound.publication_date;
    return bookToReturn;
}