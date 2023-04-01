// import { Product } from 'src/product/product.entity';
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   CreateDateColumn,
//   UpdateDateColumn,
//   ManyToMany,
//   JoinTable,
// } from 'typeorm';

// @Entity()
// export class FavoriteList {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToMany(() => Product)
//   @JoinTable({ name: 'favorite_list_item' })
//   favoriteListItems: Product[];

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;
// }
