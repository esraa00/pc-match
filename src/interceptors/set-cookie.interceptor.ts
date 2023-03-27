import {
  ExecutionContext,
  CallHandler,
  NestInterceptor,
  UseInterceptors,
  Injectable,
} from '@nestjs/common';
import { CookieOptions } from '../../node_modules/@types/express-serve-static-core/index';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/Operators';
import { ConfigService } from '@nestjs/config';

// export function UseSetCookieInterceptor(
//   cookiesNames: string[],
//   cookiesOptions: CookieOptions[],
// ) {
//   return UseInterceptors(
//     new SetCookieInterceptor(cookiesNames, cookiesOptions),
//   );
// }

@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
  constructor(
    private cookiesNames: string[],
    private cookiesOption: CookieOptions[],
    private readonly configService: ConfigService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        const response = context.switchToHttp().getResponse();
        this.cookiesNames.forEach((name, index) => {
          response.cookie(name, data[name], this.cookiesOption[index]);
        });
      }),
    );
  }
}
