import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

import { TypeormHelper } from '@shared/helpers';

export class User1704990647193 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const hasTable = await TypeormHelper.checkHasTable('user', queryRunner);

    if (hasTable) return;

    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'document',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'birthDate',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'lastAccessAt',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'createdBy',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updatedBy',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'deletedBy',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'deletedAt',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
        indices: [
          new TableIndex({
            name: 'IDX_USER',
            columnNames: [
              'id',
              'email',
              'name',
            ],
          }),
        ],
      })
    );
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const hasTable = await TypeormHelper.checkHasTable('user', queryRunner);

    if (!hasTable) return;

    await TypeormHelper.dropIndex('user', 'IDX_USER', queryRunner);
    await queryRunner.dropTable('user');
  }
}
