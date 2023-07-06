import {
  BeforeInsert,
  CreateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { nanoid } from 'nanoid';

export class BaseEntity {
  @BeforeInsert()
  private beforeInsert() {
    this.id = nanoid();
  }
  @PrimaryColumn({ length: 21 })
  id: string;

  // @PrimaryColumn('varchar', {
  //   length: 21,
  // })
  // id: string;

  // @BeforeInsert()
  // setId() {
  //   this.id = nanoid();
  // }

  // @PrimaryGeneratedColumn("uuid")
  // id;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
