import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./base/baseEntity";

@Entity()
export class DeptList extends BaseEntity {
  @Column({ comment: "部门名称", unique: true, nullable: false })
  deptName: string;

  @Column({ comment: "排序" })
  orderNo: number;

  @Column({ comment: "备注", default: null })
  remark: string;

  @Column({ comment: "状态" })
  status: number;

  @Column({ comment: "上级部门", default: null })
  parentDept: string;

  @Column({ comment: "子部门", type: "simple-array", default: null })
  children: string[];
}
