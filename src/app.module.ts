import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
let connectionString = "mongodb+srv://elyas575:Test123@cluster0.kdwmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

@Module({
  imports: [BooksModule,
    MongooseModule.forRoot(connectionString)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
