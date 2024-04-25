import { AxiosError, AxiosInstance } from 'axios';
import { readFile } from 'fs';
import Cache from 'memory-cache';
import slugify from 'slugify';
import { v4 } from 'uuid';

import { Dictionary } from '@core/models/dictionary';
import { ISearchParameterBase } from '@core/models/pagination';
import { IMemoryUsage, IRequestError } from '@core/models/utils';

import { DataType } from '@shared/enumerators';
import { BusinessError, BusinessErrorCodes } from '@shared/errors';

slugify.extend({ '.': '-' });
slugify.extend({ '/': '-' });
slugify.extend({ '\\': '-' });

export function toInteger (value: string): number {
  return parseInt(value, 10);
}

export function controllerPaginationHelper (query: qs.ParsedQs): ISearchParameterBase {
  return {
    offset: query.offset
      ? toInteger(query.offset as string) * toInteger((query.limit as string) || '10')
      : 0,
    orderBy: (query.orderBy as string) || 'createdAt',
    isDESC: query.isDESC === 'true',
    limit: Math.min(toInteger((query.limit as string) || '10'), 100),
  };
}

export function decodeBase64 (base64: string): string {
  const buffer = Buffer.from(base64, 'base64');
  return buffer.toString('ascii');
}

export function encodeBase64 (data: string): string {
  const buffer = Buffer.from(data, 'ascii');
  return buffer.toString('base64');
}

export function renameJSONKeys (data: string, keys: Map<string, string>): string {
  Object.keys(data).forEach((o) => {
    data[keys.get(o)] = data[o];
    delete data[o];
  });

  return data;
}

export function renameJSONKeysRecursively (
  data: Dictionary<unknown>,
  translation: Dictionary<string>
): void {
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'object') {
      renameJSONKeysRecursively(
        data[key] as Dictionary<unknown>,
        translation
      );
    }

    const translatedKey = translation[key] || key;

    if (translatedKey !== key) {
      data[translatedKey] = data[key];
      delete data[key];
    }
  });
}

export function calculateNetValue (value: number, interestRate: number): number {
  if (interestRate === 0) {
    return value;
  }

  return value - (value * interestRate / 100);
}

export function calculateDiscountValue (value: number, interestRate: number): number {
  if (interestRate === 0) {
    return 0;
  }

  return (value * interestRate) / 100;
}

export function getUniqueFilename (extension?: string): string {
  const timestamp = new Date().getTime();
  const random = Math.random().toString().substring(3, 13);

  if (extension) {
    return `${timestamp}_${random}.${extension}`;
  }

  return `${timestamp}_${random}`;
}

export function removeSpecialCharacters (data: string): string {
  if (!data) return '';

  return data.replace(/[^A-Za-z0-9]/g, '').replace(/\/s/g, '');
}

export function isArrayEmpty (arr: (string | JSON | number)[]): boolean {
  if (!arr.length) {
    return true;
  }

  return false;
}

export function isBlank (str: string): boolean {
  if (!str || /^\s*$/.test(str)) return true;

  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function stringReplace (base: any, params: Dictionary<string | number | boolean>) {
  Object.keys(params).forEach((opt) => {
    const value = params[opt] ? params[opt] : '';

    base = base.replace(new RegExp(`\\{${opt}\\}`, 'g'), value);
  });

  return base;
}

export function keepOnlyText (text: string): string {
  if (!text) return '';

  return text.replace(/[^A-Za-z\s]/g, '');
}

export function msToTime (s: number): string {
  function pad (n: number, z = 2) {
    return `00${n}`.slice(-z);
  }

  s = (s - (s % 1000)) / 1000;
  const secs = s % 60;

  s = (s - secs) / 60;
  const mins = s % 60;

  return `${pad((s - mins) / 60)}:${pad(mins)}:${pad(secs)}`;
}

export function getMemoryUsage (): IMemoryUsage {
  const { rss, heapTotal, heapUsed } = process.memoryUsage();

  return {
    rss: `${Math.round((rss / 1024 / 1024) * 100) / 100} MB`,
    heapTotal: `${Math.round((heapTotal / 1024 / 1024) * 100) / 100} MB`,
    heapUsed: `${Math.round((heapUsed / 1024 / 1024) * 100) / 100} MB`,
  };
}

export function sleep (milliseconds: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function normalizeString (text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function uniqueArrayElements<T> (arr: T[]): T[] {
  return Array
    .from(new Set(arr.map((o) => JSON.stringify(o))))
    .map((o) => JSON.parse(o));
}

export function removeDuplicates (arr: string[]): string[] {
  return arr.filter((v, i, a) => a.indexOf(v) === i);
}

export function generateRandomCode (start: number, end: number): string {
  const random = Math.random().toString().substring(start, end);

  return random;
}

export function calculatePercentageChange (oldValue: number, newValue: number): number {
  if (oldValue === 0) {
    return newValue === 0 ? 0 : 100;
  }

  return Number(((newValue - oldValue) / oldValue * 100).toFixed(2));
}

export function tryToJSON (raw: string): Dictionary<string | number | boolean> {
  let response = null;

  try {
    response = JSON.parse(raw);
  } catch (err) {
    // nothing
  }

  return response;
}

export function removeDuplicatesByProperties<T> (arr: T[], properties: string[]): T[] {
  const uniqueKeys = new Set<string>();
  return arr.filter((item) => {
    const key = properties.map((value) => item[value]).join('*');

    if (!uniqueKeys.has(key)) {
      uniqueKeys.add(key);
      return true;
    }

    return false;
  });
}

export function getLastElementFromArray<T> (arr: T[]): T {
  return arr[arr.length - 1];
}

export function randomNumber (max: number): number {
  return Math.floor(Math.random() * max);
}

export function randomElement<T> (arr: T[]): T {
  return arr[randomNumber(arr.length - 1)];
}

export function shuffle (arr: unknown[]) {
  let result = [];

  while (arr.length) {
    result = result.concat(arr.splice(randomNumber[arr.length - 1]));
  }

  return result;
}

export function keepOnlyNumber (value: string): string {
  if (!value) return '';

  return value.replace(/\D/g, '');
}

export function formatCurrency (value: number, currency: string, locale = 'pt-BR'): string {
  return value.toLocaleString(locale, {
    style: 'currency',
    currency,
  });
}

export function normalizeText (text: string, search: string | RegExp, replace: string): string {
  return text.replace(search, replace);
}

export function generateRandomColor (size = 6): string {
  const hexadecimal = '0123456789ABCDEF';
  const colors: string[] = [];

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  for (const _ of Array(size)) {
    const color = hexadecimal[Math.floor(Math.random() * 16)];
    colors.push(color);
  }

  return `#${colors.join('')}`;
}

export function clearCache (): void {
  Cache.clear();
}

export function getCacheByKey (key: string) {
  return Cache.get(key);
}

export function serializeStringArray (arr: string[]): string[] {
  return arr.filter((val) => val.trim() !== '');
}

export function setCacheByKey (
  key: string,
  value: unknown,
  time?: number,
  cb?: (key: string, value: string | number | boolean | Dictionary<string | number | boolean>
) => void) {
  return Cache.put(key, value, time || 1000 * 120, cb);
}

export function deleteCacheByKey (key: string): void {
  Cache.del(key);
}

export function validateEnumByValue (enumerator: object, value: number) {
  const setEnum = new Set(Object.values(enumerator));
  return setEnum.has(value);
}

export function getFirstWordFromText (text: string) {
  const words = text.split(' ');
  const [ firstWord ] = words;
  return firstWord;
}

export function getLastWordFromText (text: string) {
  const words = text.split(' ');
  const lastWord = words[words.length - 1];
  return lastWord;
}

export function findElementsNotInArray<T> (sourceArray:T[], referenceArray: T[]):T[] {
  const referenceSet = new Set(referenceArray);
  return sourceArray.filter((item) => !referenceSet.has(item));
}

export function handleError (err: AxiosError, toLog = false) {
  const error: IRequestError = {
    domain: err.config && err.config.baseURL,
    url: err.config && err.config.url,
    method: err.config && err.config.method,
    headers: err.config && err.config.headers,
    data: err.config && err.config.data,
    response: null,
    status: null,
    timeout: err.code && err.code === 'ECONNABORTED',
    message: err.message,
    code: err.code,
  };

  if (err.response) {
    error.response = err.response.data;
    error.status = err.response.status;
  }

  if (toLog) {
    delete error.headers;
    delete error.data;
    delete error.timeout;
  }

  return error;
}

export function addLoggers (
  instance: AxiosInstance,
  origin: string,
  overshadow = false
): AxiosInstance {
  const requestIdentifier = v4();

  instance.interceptors.request.use((request) => {
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return instance;
}

export function slug (text = '', replacement = '-', lower = true) {
  return slugify(text, { lower, replacement, strict: true });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function overshadowRecursively (data: Record<string, unknown>, sensitiveKeys: string[]) {
  const toOvershadow = Object.assign({}, data);

  return toOvershadow;
}

export function parseByDataType (
  data: string,
  type: DataType
): string | number | boolean {
  if (type === DataType.STRING) {
    return data;
  }

  if (type === DataType.NUMBER) {
    return Number(data);
  }

  if (type === DataType.BOOLEAN) {
    return data === 'true';
  }

  if (type === DataType.ARRAY) {
    return JSON.parse(data);
  }

  if (type === DataType.OBJECT) {
    return JSON.parse(data);
  }
}

export function convertArrayToDictionary<T> (arr: Dictionary<T>[]): Dictionary<T> {
  const dictionary = arr.reduce((acc, curr) => ({ ...acc, ...curr }), {});

  return dictionary;
}
