import { DateTime } from 'luxon';

export class LuxonHelper {
  static toDate (inp: string, format = 'yyyy-MM-dd'): Date {
    return DateTime.fromFormat(inp, format).toJSDate();
  }

  static toFormat (inp: Date | string, format = 'yyyy-MM-dd'): string {
    if (inp instanceof Date) {
      return DateTime.fromJSDate(inp).toFormat(format);
    }

    return DateTime.fromISO(inp).toFormat(format);
  }

  static getCurrent (): string {
    return DateTime.local().toISODate();
  }

  static getCurrentDate (): Date {
    return DateTime.local().toJSDate();
  }

  static diffInDays (start: Date, end: Date): number {
    return DateTime.fromJSDate(end).diff(DateTime.fromJSDate(start), 'days').days;
  }

  static addDays (start: Date, toAdd: number): Date {
    return DateTime.fromJSDate(start).plus({ days: toAdd }).toJSDate();
  }

  static addHours (start: Date, toAdd: number): Date {
    return DateTime.fromJSDate(start).plus({ hours: toAdd }).toJSDate();
  }

  static minusHours (start: Date, toRemove: number): Date {
    return DateTime.fromJSDate(start).minus({ hours: toRemove }).toJSDate();
  }

  static isValidDate (inp: string, format = 'yyyy-MM-dd'): boolean {
    return DateTime.fromFormat(inp, format).isValid;
  }

  static getStartAndEndOfDay (inp: string) {
    const date = DateTime.fromISO(inp);
    const startOfDay = date.startOf('day').toJSDate();
    const endOfDay = date.endOf('day').toJSDate();
    return { startOfDay, endOfDay };
  }

  static getStartOfDay (inp: string, format = 'yyyy-MM-dd HH:mm:ss'): string {
    const date = DateTime.fromISO(inp);
    return date.startOf('day').toFormat(format);
  }

  static getEndOfDay (inp: string, format = 'yyyy-MM-dd HH:mm:ss'): string {
    const date = DateTime.fromISO(inp);
    return date.endOf('day').toFormat(format);
  }

  static getStartAndEndOfMonth (inp?: string) {
    const date = DateTime.fromISO(inp || this.getCurrent());
    const startDate = date.startOf('month').toISODate();
    const endDate = date.plus({ months: 1 }).startOf('month').minus({ days: 1 }).toISODate();
    return { startDate, endDate };
  }

  static getCurrentTimestamp (): number {
    return DateTime.now().toMillis();
  }
}