import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { BaseEntity } from './base/baseEntity';

@Entity()
export class DeptList extends BaseEntity {
  @Index()
  @Column({ comment: '部门名称', unique: true, nullable: false })
  deptName: string;

  @Column({ comment: '排序' })
  orderNo: number;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Index()
  @Column({ comment: '状态', length: 50 })
  status: string;

  @Column({ comment: '上级部门', nullable: true })
  parentDept: string;

  @Column({ comment: '子部门', type: 'simple-array', nullable: true })
  children: string[];
}
