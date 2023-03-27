import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { CustomJwtModule } from './custom-jwt/custom-jwt.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.entity';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { Product } from './product/product.entity';
import { Category } from './category/category.entity';
import { Tag } from './tag/tag.entity';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './cart/entities/cart-item.entity';

//for root => automatically be shared down into all other modules
@Module({
  imports: [
    //During this step, environment variable key/value pairs are parsed and resolved
    // will load and parse a .env file from the default location (the project root directory), merge key/value pairs from the .env file with environment variables assigned to process.env, and store the result in a private structure that you can access through the ConfigService. The forRoot() method registers the ConfigService provider, which provides a get() method for reading these parsed/merged configuration variables. Since @nestjs/config relies on dotenv, it uses that package's rules for resolving conflicts in environment variable names. When a key exists both in the runtime environment as an environment variable (e.g., via OS shell exports like export DATABASE_USER=test) and in a .env file, the runtime environment variable takes precedence.
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          username: config.get<string>('DB_USERNAME'),
          database: config.get<string>('DB_NAME'),
          password: config.get<string>('DB_PASSWORD'),
          synchronize: true,
          entities: [User, Role, Product, Category, Tag, Cart, CartItem],
        };
      },
    }),
    UserModule,
    AuthModule,
    EmailModule,
    CustomJwtModule,
    RoleModule,
    ProductModule,
    CategoryModule,
    TagModule,
    CartModule,
  ],
})
export class AppModule {}
