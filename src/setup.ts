import * as bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Application, Response } from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import { InversifyExpressServer } from 'inversify-express-utils';
// import { v4 } from 'uuid';

// import { ICustomRequest } from '@core/models/custom-request';

export function initializeApp (server: InversifyExpressServer): Application {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  server.setConfig((app: Application) => {
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: '500mb',
      })
    );

    app.use(
      bodyParser.json({
        limit: '500mb',
      })
    );

    app.use(cookieParser());
    app.use(compress());
    app.use(helmet());
    app.use(cors());

    // RateLimitService.addRateLimit(app);

    // app.use((req: ICustomRequest, _res: Response, next: NextFunction) => {
    //   req.headers['X-Request-ID'] = v4();
    //   next();
    // });

    // enable operation logger
    // app.use((req, _res, next) => operationLogger(req as unknown as ICustomRequest, _res, next));
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  server.setErrorConfig((app: any) => {
    app.use((_req: Request, res: Response): void => {
      res.status(httpStatus.NOT_FOUND).json();
    });

    // Handle 500
    // do not remove next from line bellow, error handle will not work
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    // app.use((err: any, req: ICustomRequest, res: Response, _next: NextFunction): void => handleError(err, req, res));
  });

  return server.build();
}