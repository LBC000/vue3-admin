import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./base/baseEntity";

@Entity()
export class User extends BaseEntity {
  @Column({ comment: "用户名", unique: true, nullable: false })
  username: string;

  @Column({ comment: "密码", nullable: false })
  password: string;

  @Column({ type: "simple-array", comment: "角色", nullable: true })
  roles: string[];

  @Column({ comment: "昵称", nullable: true })
  nickname: string;

  @Column({ comment: "电子邮箱", nullable: true })
  email: string;

  @Column({ comment: "真名", nullable: true })
  realName: string;

  @Column({ comment: "介绍", nullable: true })
  desc: string;

  @Column({ comment: "状态", nullable: true })
  status: number;
}
