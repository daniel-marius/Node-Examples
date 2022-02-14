import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import 'express-async-errors';
const fetch = (...args: any[]) => import('node-fetch').then(({default: fetch}) => fetch(...args));
import { BadRequestError } from './errors/bad-request-error';
import { NotFoundError } from './errors/not-found-error';
import { HttpStatusMessage } from './errors/http-status';
import { errorHandler } from './middlewares/error-handler';

const PORT: number = 3000;

const app: Application = express();

app.use(express.json());
app.use(helmet());

app.get('/', async (req: Request, res: Response) => {
  // if (req.params.id.includes('id')) {
  //   throw new BadRequestError('forgot something?', HttpStatusMessage.BAD_REQUEST);
  // }

  const response = await fetch('https://fakestoreapi.com/products');
  const json = await response.json();

  if (json.length <= 20) {
    throw new BadRequestError('forgot something?', 'bad request error!');
  }

  res.status(200).send(json);
});

app.all('*', async (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError('Please try again!', `Route: ${req.originalUrl} Not Found!`, );
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
