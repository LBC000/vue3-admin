import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./base/baseEntity";

@Entity()
export class User extends BaseEntity {
  // @PrimaryGeneratedColumn()
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ comment: "用户名" })
  username: string;

  @Column({ comment: "密码" })
  password: string;

  @Column({ type: "text", comment: "角色" })
  roles: string;

  @Column({ comment: "昵称" })
  nickname: string;

  @Column({ comment: "电子邮箱" })
  email: string;

  @Column({ comment: "真名" })
  realName: string;

  @Column({ comment: "介绍" })
  desc: string;

  @Column({ comment: "状态" })
  status: number;
}
