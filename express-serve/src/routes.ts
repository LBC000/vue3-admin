import { UserController } from "./controller/UserController";
import { TestController } from "./controller/TestController";
import { AdminController } from "./controller/AdminController";

export const Routes = [
  // 获取菜单
  {
    method: "get",
    route: "/getMenuList",
    controller: AdminController,
    action: "getMenuList",
  },

  // 获取个人信息
  {
    method: "get",
    route: "/getUserInfo",
    controller: AdminController,
    action: "getUserInfo",
  },

  // 权限码
  {
    method: "get",
    route: "/getPermCode",
    controller: AdminController,
    action: "getPermCode",
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
  },

  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
  },

  // 测试
  {
    method: "get",
    route: "/test/getList",
    controller: TestController,
    action: "getList",
  },
];
