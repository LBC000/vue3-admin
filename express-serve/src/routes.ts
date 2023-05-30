import { UserController } from "./controller/UserController";
import { TestController } from "./controller/TestController";

export const Routes = [
  {
    method: "get",
    route: "/getMenuList",
    controller: UserController,
    action: "getMenuList",
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
