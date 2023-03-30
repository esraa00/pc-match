import {
  IsArray,
  IsDate,
  IsInt,
  IsJSON,
  IsNumber,
  IsString,
} from 'class-validator';

export class createProductDTO {
  @IsString()
  productName: string;

  @IsInt()
  quantity: number;

  @IsNumber()
  price: number;

  @IsJSON()
  specifications: Record<string, any>;

  @IsString()
  image: string;

  @IsNumber()
  discountAmount: number;

  @IsString()
  discountExpiryDate: string;

  @IsString()
  category: string;

  @IsArray()
  tags: [string];
}
