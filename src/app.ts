import './core/module-alias';

import { Server } from '@src/server';

import { initializeConstants } from '@core/constants';
import { initializeDatabase } from '@core/db/database';
// import { seedsDatabase } from '@core/db/seeds';

import { logError } from '@shared/logging/console';

async function bootstrap (): Promise<void> {
  initializeConstants();
  await initializeDatabase();
  // await seedsDatabase();

  new Server();
}

bootstrap().catch((err) => logError(`⚠️ bootstrap: ${err.message}`));
