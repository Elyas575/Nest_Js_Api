import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetAllBooksParamsDto {

    @IsOptional()
    @IsString()
    title?: string;    

    @IsOptional()
    @IsString()     
    author?: string;   

    @IsOptional()
    @IsNumber({}, { message: " 'price' query must be of number type or it should not be included."})  
    @Transform(({ value }) => value ? Number(value) : value) // ensures the param is a number, transforms it from it's default type form to number
    price?: number;    

    @IsOptional()
    @IsString()    
    category?: string;  

    @IsOptional()
    @IsString() 
    date?:string;  

    @IsOptional()
    @IsString()
    publication_date?: string; 
  }