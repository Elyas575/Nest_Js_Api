import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class GetAllBooksParamsDto {

    @IsOptional()
    @IsString()
    title?: string;    

    @IsOptional()
    @IsString()     
    author?: string;   

    @IsOptional()
    @IsInt()     
    @Transform(({ value }) => value ? Number(value) : value) // ensures the param is a number, transforms it from string to number
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