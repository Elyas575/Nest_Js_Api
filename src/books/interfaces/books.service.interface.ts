import { GetAllBooksParamsDto } from "../dtos/get-all-books-params.dto";
import { Book } from "./book.interface";

export interface IBookService {
    getAllBooks(params?: GetAllBooksParamsDto): Book[];
    getBookById(id: number): Book;
  }