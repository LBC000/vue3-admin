import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { BaseEntity } from './base/baseEntity';

@Entity()
export class MenuTree extends BaseEntity {
  @Index('MenuTree-menuDataId')
  @Column({ comment: '菜单id', unique: true, nullable: false })
  menuDataId: string;

  @Index('MenuTree-parentMenu')
  @Column({ comment: '上级菜单id', nullable: true })
  parentMenu: string;

  @Column({ comment: '菜单类型 0:目录  1:菜单  2:按钮', nullable: false })
  type: string;

  @Column({ comment: '菜单名称', unique: true, nullable: false })
  menuName: string;

  @Column({ comment: '路由地址', unique: true, nullable: false })
  routePath: string;

  @Column({ comment: '图标', nullable: false })
  icon: string;

  // menu1:view:btn2
  @Column({ comment: '权限', type: 'text', nullable: true })
  permission: string;

  @Column({ comment: '页面组件', nullable: true })
  component: string;

  @Column({ comment: '排序', nullable: true })
  orderNo: string;

  @Column({ comment: '状态： 启用 停用', nullable: true })
  status: string;

  @Column({ comment: '是否外链', length: 1, nullable: true })
  isExt: string;

  @Column({ comment: '是否显示', length: 1, nullable: true })
  show: string;

  @Column({ comment: '子菜单', type: 'simple-array', nullable: true })
  children: string[];
}
