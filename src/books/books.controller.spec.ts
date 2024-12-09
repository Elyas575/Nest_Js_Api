import { BooksService } from './books.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller'; 
import { GetAllBooksParamsDto } from './dtos/get-all-books-params.dto';
import { Book } from './interfaces/book.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema, schema } from '../models/Books.Schema';
import mongoose from 'mongoose';

describe('BooksController', () => {
  let booksController: BooksController;
  let connectionString = "mongodb+srv://elyas575:Test123@cluster0.kdwmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(connectionString), 
        MongooseModule.forFeature([{ name: BookSchema.name, schema: schema }]), 
      ],
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    booksController = app.get<BooksController>(BooksController);
  });

  describe('root', () => {
    it('should return all 12 books and their properties', async () => {
        const booksFound = await booksController.getBooks();
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

    it('should return the correct book by id', async () => {
      const book = await booksController.getBookById(1);
      expect(book.id).toBe(1);
      expect(book.title).toBe('Effective Java');
      expect(book.author).toBe('Joshua Bloch');
      expect(book.price).toBe(40);
      expect(book.category).toBe('Java');
      expect(book.publication_date).toBe('2008-05-28');
    });

    it('should filter books by price', async () => {
      const params: GetAllBooksParamsDto = { price: 40 };
      const booksFound = await booksController.getBooks(params);
      
      expect(booksFound.length).toBe(4);
      booksFound.forEach((book) => {
        expect(book.price).toBe(40);
      });
    });

    it('should filter books by author', async () => {
      const params: GetAllBooksParamsDto = { author: 'Joshua Bloch' };
      const booksFound = await booksController.getBooks(params);

      expect(booksFound.length).toBe(1);
      expect(booksFound[0].id).toBe(1);
      expect(booksFound[0].author).toBe('Joshua Bloch');
    });

    it('should filter books by category', async () => {
      const params: GetAllBooksParamsDto = { category: 'Java' };
      const booksFound = await booksController.getBooks(params);

      expect(booksFound.length).toBe(7);
      booksFound.forEach((book) => {
        expect(book.category).toBe('Java');
      });
    });

    it('should filter books by publication year partially', async () => {
      const params: GetAllBooksParamsDto = { date: '2011' };
      const booksFound = await booksController.getBooks(params);

      expect(booksFound.length).toBe(2);
      booksFound.forEach((book) => {
        expect(book.publication_date).toMatch(/^2011/);  
      });
    });

    it('should filter books by publication year fully', async () => {
        const params: GetAllBooksParamsDto = { date: '2011-06-01' };
        const booksFound = await booksController.getBooks(params);
        expect(booksFound.length).toBe(1);
        booksFound.forEach((book) => {
          expect(book.publication_date).toBe("2011-06-01");  
        });
      });


      it('should filter books by category and price', async () => {
        const params: GetAllBooksParamsDto = { date: '2011-06-01', category:'Java' };
        const booksFound = await booksController.getBooks(params);
   
        expect(booksFound.length).toBe(1);
        booksFound.forEach( (book)=>{
           expect(book.category).toBe('Java')
           expect(book.publication_date).toBe('2011-06-01')
        })}
)});
});
