import { QueryRunner, Table, TableForeignKey } from 'typeorm';

export class TypeormHelper {
  static async dropTableForeignKeys (
    tableName: string,
    foreignKeysNames: string[],
    queryRunner: QueryRunner
  ): Promise<void> {
    const table: Table = await queryRunner.getTable(tableName);
    const foreignKeys: TableForeignKey[] = [];

    foreignKeysNames.forEach((foreignKeyName: string): void => {
      const currentForeignKey: TableForeignKey = table.foreignKeys.find(
        (foreignKey: TableForeignKey): boolean =>
          foreignKey.columnNames.indexOf(foreignKeyName) !== -1
      );

      foreignKeys.push(currentForeignKey);
    });

    await queryRunner.dropForeignKeys(tableName, foreignKeys);
  }

  static async checkHasTable (
    tableName: string,
    queryRunner: QueryRunner
  ): Promise<boolean> {
    const hasTable = await queryRunner.hasTable(tableName);

    return hasTable;
  }

  static async checkHasTables (
    tablesName: string[],
    queryRunner: QueryRunner
  ): Promise<boolean> {
    const hasTables: boolean[] = [];

    for (const tableName of tablesName) {
      // eslint-disable-next-line no-await-in-loop
      const hasTable = await queryRunner.hasTable(tableName);

      hasTables.push(hasTable);
    }

    return hasTables.every((hasTable) => hasTable);
  }

  static async checkHasColumn (
    tableName: string,
    columnName: string,
    queryRunner: QueryRunner
  ): Promise<boolean> {
    const hasColumn = await queryRunner.hasColumn(tableName, columnName);

    return hasColumn;
  }

  static async checkHasColumns (
    tableName: string,
    columnsName:string[],
    queryRunner: QueryRunner
  ): Promise<boolean> {
    const hasColumns: boolean[] = [];

    for (const columnName of columnsName) {
      // eslint-disable-next-line no-await-in-loop
      const hasColumn = await queryRunner.hasColumn(tableName, columnName);

      hasColumns.push(hasColumn);
    }

    return hasColumns.every((hasColumn) => hasColumn);
  }

  static async dropIndex (
    tableName: string,
    indexName: string,
    queryRunner: QueryRunner
  ): Promise<void> {
    await queryRunner.dropIndex(tableName, indexName);
  }
}
