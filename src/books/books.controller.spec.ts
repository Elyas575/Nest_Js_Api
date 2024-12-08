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
    it('should return all 12 books and their properties', () => {
        const booksFound = booksController.getBooks();
        expect(booksFound).toBeInstanceOf(Array);
        expect(booksFound.length).toBe(12);
        booksFound.forEach((book) => {
          expect(book).toHaveProperty('id');
          expect(book).toHaveProperty('title');
          expect(book).toHaveProperty('author');
          expect(book).toHaveProperty('category');
          expect(book).toHaveProperty('price');
          expect(book).toHaveProperty('publication_date');
        });
      });

    it('should return the correct book by id', () => {
      const book = booksController.getBookById(1);
      expect(book.id).toBe(1);
      expect(book.title).toBe('Effective Java');
      expect(book.author).toBe('Joshua Bloch');
      expect(book.price).toBe(40);
      expect(book.category).toBe('Java');
      expect(book.publication_date).toBe('2008-05-28');
    });

    it('should filter books by price', async () => {
      const params: GetAllBooksDto = { price: 40 };
      const booksFound = await booksController.getBooks(params);
      
      expect(booksFound.length).toBe(4);
      booksFound.forEach((book) => {
        expect(book.price).toBe(40);
      });
    });

    it('should filter books by author', async () => {
      const params: GetAllBooksDto = { author: 'Joshua Bloch' };
      const booksFound = await booksController.getBooks(params);

      expect(booksFound.length).toBe(1);
      expect(booksFound[0].id).toBe(1);
      expect(booksFound[0].author).toBe('Joshua Bloch');
    });

    it('should filter books by category', async () => {
      const params: GetAllBooksDto = { category: 'Java' };
      const booksFound = await booksController.getBooks(params);

      expect(booksFound.length).toBe(7);
      booksFound.forEach((book) => {
        expect(book.category).toBe('Java');
      });
    });

    it('should filter books by publication year partially', async () => {
      const params: GetAllBooksDto = { date: '2011' };
      const booksFound = await booksController.getBooks(params);

      expect(booksFound.length).toBe(2);
      booksFound.forEach((book) => {
        expect(book.publication_date).toMatch(/^2011/);  
      });
    });

    it('should filter books by publication year fully', async () => {
        const params: GetAllBooksDto = { date: '2011-06-01' };
        const booksFound = await booksController.getBooks(params);
        expect(booksFound.length).toBe(1);
        booksFound.forEach((book) => {
          expect(book.publication_date).toBe("2011-06-01");  
        });
      });


      it('should filter books by category and price', async () => {
        const params: GetAllBooksDto = { date: '2011-06-01', category:'Java' };
        const booksFound = await booksController.getBooks(params);
   
        expect(booksFound.length).toBe(1);
        booksFound.forEach( (book)=>{
           expect(book.category).toBe('Java')
           expect(book.publication_date).toBe('2011-06-01')
        })}
)});
});
