import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

import { TypeormHelper } from '@shared/helpers';

export class CreateMovies1713915343119 implements MigrationInterface {
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        const hasTable = await TypeormHelper.checkHasTable('movies', queryRunner);
        if (hasTable) return;

        await queryRunner.createTable(
            new Table({
              name: 'movies',
              columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'tmdbId',
                    type: 'int4',
                    isNullable: false,
                },
                {
                    name: 'originalTitle',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'mediaType',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'adult',
                    type: 'boolean',
                    isNullable: false,
                    default: false,
                  },
                  {
                    name: 'originalLanguage',
                    type: 'varchar',
                    isNullable: false,
                  },
                  {
                    name: 'releaseDate',
                    type: 'timestamptz',
                    default: 'now()',
                    isNullable: false,
                  },
                  {
                    name: 'voteAverage',
                    type: 'int4',
                    isNullable: false,
                  },
                  {
                    name: 'voteCount',
                    type: 'int4',
                    isNullable: false,
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
                  name: 'IDX_MOVIES',
                  columnNames: [
                    'id',
                    'tmdbId',
                  ],
                }),
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const hasTable = await TypeormHelper.checkHasTable('movies', queryRunner);
        if (hasTable) return;

        await TypeormHelper.dropIndex('movies', 'IDX_MOVIES', queryRunner);
        await queryRunner.dropTable('movies');
    }

}

// tmdbId: number > id
// originalTitle: string > original_title
// title: string > title
// description: string > overview
// mediaType: string > media_type
// adult: boolean > adult
// originalLanguage: string > original_language
// releaseDate: Data > release_date
// voteAverage: number > vote_average
// voteCount: number > vote_count

// paginação
// order by releaseDate asc
