import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';

import { BadRequestError } from './errors/bad-request-error';
import { NotFoundError } from './errors/not-found-error';
import { HttpStatusMessage } from './errors/http-status';
import { errorHandler } from './middlewares/error-handler';

const PORT: number = 3000;

const app: Application = express();

app.use(express.json());
app.use(helmet());

app.get('/:id', (req: Request, res: Response) => {
  if (req.params.id.includes('id')) {
    throw new BadRequestError('forgot something?', HttpStatusMessage.BAD_REQUEST);
  }

  res.status(200).send(HttpStatusMessage.OK);
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError(`URL: ${req.originalUrl} Not Found!`, HttpStatusMessage.NOT_FOUND);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
