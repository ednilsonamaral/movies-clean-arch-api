import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export function validateDTO<T> (type: new () => T): (req: Request, res: Response, next: NextFunction) => void {
  return (req, res, next) => {
    const input = plainToInstance(type, req.body);
    validate(input as object, { skipMissingProperties: false }).then((errors) => {
      if (errors.length > 0) {
        const message = errors.map((error) =>
          Object.values(error.constraints ? error.constraints : {}).join(', ')
        ).join(', ');
        res.status(400).json({ message });
      } else {
        req.body = input;
        next();
      }
    });
  };
}
