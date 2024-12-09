import { GetAllBooksParamsDto } from "../dtos/get-all-books-params.dto";
import { GetBookDto } from "../dtos/get-book.dto";

export interface IBookService {
    getAllBooks(params?: GetAllBooksParamsDto): Promise<GetBookDto[]>;
    getBookById(id: number): Promise<GetBookDto>;
  }