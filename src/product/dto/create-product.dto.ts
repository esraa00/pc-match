import { IsDate, IsInt, IsJSON, IsNumber, IsString } from 'class-validator';

export class createProductDTO {
  @IsString()
  productName: string;

  @IsInt()
  quantity: number;

  @IsNumber()
  price: number;

  @IsJSON()
  specifications: string;

  @IsString()
  image: string;

  @IsNumber()
  discountAmount: number;

  @IsDate()
  discountExpiryDate: Date;

  @IsString()
  category: string;

  @IsString()
  tags: [string];
}
