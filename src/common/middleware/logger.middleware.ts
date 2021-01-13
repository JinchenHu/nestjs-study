import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ClassLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('This is a class middleware');
    next();
  }
}

export const FunctionalLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('This is a functional middleware');
  next();
};
