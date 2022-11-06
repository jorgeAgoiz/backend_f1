import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CORRELATION_ID } from '../constants/logger';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id: string = uuidv4();

    req.headers[CORRELATION_ID] = id;
    res.set(CORRELATION_ID, id);
    next();
  }
}
