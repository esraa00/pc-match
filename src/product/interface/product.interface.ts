import { Category } from 'src/category/category.entity';
import { Tag } from 'src/tag/tag.entity';
import { User } from 'src/user/user.entity';

export interface Product {
  productName: string;
  quantity: number;
  price: number;
  specifications: string;
  image: string;
  discountAmount: number;
  discountExpiryDate: Date;
  user: User;
  category: Category;
  tags: Tag[];
}
