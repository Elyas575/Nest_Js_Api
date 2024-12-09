import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookDto {

    @IsNumber()
    id:number;

    @IsString()
    title: string;    

    @IsString()     
    author: string;   

    @IsNumber()  
    price: number;    

    @IsString()    
    category: string;  

    @IsString() 
    date:string;  

    @IsString()
    publication_date?: string; 
  }