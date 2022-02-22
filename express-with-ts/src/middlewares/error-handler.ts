import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
import { HttpStatusCode } from '../errors/http-status';

/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
 export const errorHandler = (
   err: Error,
   req: Request,
   res: Response,
   next: NextFunction
 ) => {

   // common response structure
   // { errors: { message: string, field?: string }[]  }

   if (err instanceof CustomError) {
     return res.status(err.statusCode).send({ error: err.serializeErrors() });
   }

   if (req.timedout) {
     console.log(`Attempted to call ${req.method} method after timeout .01s`);
     return res.status(HttpStatusCode.SERVICE_UNAVAILABLE).send({error: 'Service unavailable. Please retry.'});
   }

   res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
     error: { message: 'Something went wrong!' }
   });

   next();
 };
