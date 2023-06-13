const { celebrate, Joi, Segments } = require("celebrate");

import { UserController } from "./controller/UserController";
import { TestController } from "./controller/TestController";
import { AdminController } from "./controller/AdminController";

export const Routes = [
  // admin 开始
  // 获取菜单
  {
    method: "get",
    route: "/getMenuList",
    controller: AdminController,
    action: "getMenuList",
  },

  // 获取菜单-系统
  {
    method: "get",
    route: "/system/getMenuList",
    controller: AdminController,
    action: "systemGetMenuList",
  },

  // 获取个人信息
  {
    method: "get",
    route: "/getUserInfo",
    controller: AdminController,
    action: "getUserInfo",
  },

  // 获取部门列表
  {
    method: "get",
    route: "/system/getDeptList",
    controller: AdminController,
    action: "getDeptList",
  },

  // 获取账号列表
  {
    method: "get",
    route: "/system/getAccountList",
    controller: AdminController,
    action: "getAccountList",
  },

  // 获取角色列表
  {
    method: "get",
    route: "/system/getAllRoleList",
    controller: AdminController,
    action: "getAllRoleList",
  },

  // 获取角色列表分页
  {
    method: "get",
    route: "/system/getRoleListByPage",
    controller: AdminController,
    action: "getRoleListByPage",
  },

  // 权限码
  {
    method: "get",
    route: "/getPermCode",
    controller: AdminController,
    action: "getPermCode",
  },

  // 检测用户名
  {
    method: "post",
    route: "/system/accountExist",
    controller: AdminController,
    action: "accountExist",
  },

  // 退出
  {
    method: "get",
    route: "/logout",
    controller: AdminController,
    action: "logout",
  },

  // 登录
  {
    method: "post",
    route: "/login",
    controller: AdminController,
    action: "login",
    // 验证
    celebrate: celebrate({
      [Segments.BODY]: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
  },

  // 注册超级管理员
  {
    method: "post",
    route: "/registerSuperAdmin",
    controller: UserController,
    action: "registerSuperAdmin",
    // 验证
    celebrate: celebrate({
      [Segments.BODY]: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
  },

  // {
  //   method: "get",
  //   route: "/users",
  //   controller: UserController,
  //   action: "all",
  // },
  // {
  //   method: "get",
  //   route: "/users/:id",
  //   controller: UserController,
  //   action: "one",
  // },
  // {
  //   method: "post",
  //   route: "/users",
  //   controller: UserController,
  //   action: "save",
  // },
  // {
  //   method: "delete",
  //   route: "/users/:id",
  //   controller: UserController,
  //   action: "remove",
  // },
  // admin 结束

  // 测试
  {
    method: "get",
    route: "/test/getList",
    controller: TestController,
    action: "getList",
  },
];
