import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { Request } from 'src/common/request';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const user = req.headers['authorization'];

    if (user) {
      req.user = user;
      return next();
    }

    return next(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));
  }
}
