import ModuleAlias from 'module-alias';
import { join } from 'path';

ModuleAlias.addAliases({
  '@src': join(__dirname, '..'),
  '@core': join(__dirname, '..', 'core'),
  '@modules': join(__dirname, '..', 'modules'),
  '@shared': join(__dirname, '..', 'shared'),
});
