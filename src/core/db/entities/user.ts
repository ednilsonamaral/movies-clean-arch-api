import { Column, Entity } from 'typeorm';

import { RoleType } from '@src/shared/enumerators';

import BaseEntity from '@core/db/entities/base';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  public name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  public email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  public document?: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  public birthDate?: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public phone?: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: RoleType.READ_ONLY,
  })
  public role: RoleType;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  public lastAccessAt?: Date;

  constructor (props: Partial<UserEntity>) {
    super();
    Object.assign(this, props);
  }
}
