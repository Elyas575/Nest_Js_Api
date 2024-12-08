
import { Injectable } from "@nestjs/common";
import { booksData } from "src/dummydata/books";

@Injectable()
export class BooksService {

    users: any[] = booksData;

    // to do make an interface of type USER and make it the return type
    getAllUsers(): any{
        return this.users;
    }

    // to do make an interface of type USER and make it the return type
    getUserById(id:number){
        return this.users.find(user => user.id = id);
    }

}