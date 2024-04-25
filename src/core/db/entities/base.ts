import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export default class Base {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public createdBy?: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  public createdAt?: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public updatedBy?: string;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  public updatedAt?: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public deletedBy?: string;

  @DeleteDateColumn({
    type: 'timestamptz',
    nullable: true,
  })
  public deletedAt?: Date;
}
