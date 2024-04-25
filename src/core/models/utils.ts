import { Environments } from '@shared/enumerators';

export interface IMemoryUsage {
  rss: string;
  heapTotal: string;
  heapUsed: string;
}

export interface IHealthStatus {
  app: string;
  env: Environments;
  uptime: string;
  now: string;
  memory: IMemoryUsage;
}

export interface IExport {
  buffer: Buffer;
  filename: string;
}

export interface IRequestError {
  domain?: string;
  url?: string;
  method?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response?: any;
  timeout?: boolean;
  message?: string;
  code?: string;
  status?: number;
}