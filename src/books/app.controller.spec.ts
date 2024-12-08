import { BooksService } from './books.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller'; 
import { GetAllBooksDto } from './interfaces/dtos/get-all-books.dto';
import { Book } from './interfaces/books.interface';


describe('BooksController', () => {
  let booksController: BooksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    booksController = app.get<BooksController>(BooksController);
  });

  describe('root', () => {

    it('should return the correct book', () => {
      expect(booksController.getBookById(1)).toStrictEqual({
        author: "Joshua Bloch",
        category: "Java",
        id: 1,
        price: 40,
        publication_date: "2008-05-28",
        title: "Effective Java"
      });
    });

    it('should return all 12 books when no params are passed', () => {
        const result = booksController.getBooks();
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(12); 
      });

      it('should filter books by price', async () => {
        const params: GetAllBooksDto = { price: 40 };
        const result: Book[] = [
            { id: 1, title: 'Effective Java', author: 'Joshua Bloch', category: 'Java', price: 40, publication_date: '2008-05-28' },
            { id: 5, title: 'Spring in Action', author: 'Craig Walls', category: 'Java', price: 40, publication_date: '2011-11-15' },
            { id: 7, title: 'Java Performance', author: 'Scott Oaks', category: 'Java', price: 40, publication_date: '2014-04-14' },
            { id: 9, title: 'Java Concurrency in Practice', author: 'Brian Goetz', category: 'Java', price: 40, publication_date: '2006-05-19' }
          ];
    
        const booksFound = await booksController.getBooks(params);
        expect(booksFound).toEqual(result)
        expect(booksFound.length).toBe(4);  
        expect(booksFound[0].price).toBe(40);
      });


  });

  
});