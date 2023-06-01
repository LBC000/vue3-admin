import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./base/baseEntity";

@Entity()
export class User extends BaseEntity {
  // @PrimaryGeneratedColumn()
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  realName: string;

  @Column()
  desc: string;
}
