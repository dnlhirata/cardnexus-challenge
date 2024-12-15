import morgan from 'morgan';
import express, { type Request, type Response, type NextFunction } from 'express';
import logger from 'jet-logger';
import cors from 'cors';

import 'express-async-errors';

import BaseRouter from '@src/routes';

import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/classes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api', BaseRouter);

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'test') {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
    res.status(status).json({ error: err.message });
  }
  return next(err);
});

export default app;
