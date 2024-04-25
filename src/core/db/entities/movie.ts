import { Column, Entity } from 'typeorm';

import BaseEntity from '@core/db/entities/base';

@Entity('movies')
export class MovieEntity extends BaseEntity {
  @Column({
    type: 'int4',
    nullable: false,
  })
  public tmdbId: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public originalTitle: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public title: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public description: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public mediaType: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  public adult: boolean;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public originalLanguage: string;

  @Column({
    type: 'timestamptz',
    default: 'now()',
    nullable: false,
  })
  public releaseDate: Date;

  @Column({
    type: 'int4',
    nullable: false,
  })
  public voteAverage: number;

  @Column({
    type: 'int4',
    nullable: false,
  })
  public voteCount: number;

  constructor (props: Partial<MovieEntity>) {
    super();
    Object.assign(this, props);
  }
}
