import './core/module-alias';
import { InversifyExpressServer } from 'inversify-express-utils';

import { initializeApp } from '@src/setup';

import { getEnv } from '@core/constants';
import { container } from '@core/container';

import { logInit } from '@shared/logging/console';

export class Server {
  constructor () {
    this.createServer();
  }

  createServer (): void {
    const server = new InversifyExpressServer(container, null, { rootPath: '/' });

    const app = initializeApp(server);
    const { port, env } = getEnv();

    app.listen(port, () => {
      logInit(`✅ Server started at http://localhost:${port}`);
      logInit(`⚙️ Environment: ${env}`);
    });
  }
}