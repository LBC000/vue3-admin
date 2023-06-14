import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";

import { resFormatError, resFormatSuccess } from "../utils/util";
import { User } from "../entity/User";
import { verifyHash } from "../utils/encryptionUtils";
import { DeptList } from "../entity/DeptList";

// 菜单数据
let dataMenuList = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: "LAYOUT",
    redirect: "/dashboard/workbench",
    meta: {
      title: "routes.dashboard.dashboard",
      hideChildrenInMenu: true,
      icon: "bx:bx-home",
    },
    children: [
      {
        path: "analysis",
        name: "Analysis",
        component: "/dashboard/analysis/index",
        meta: {
          hideMenu: true,
          hideBreadcrumb: true,
          title: "routes.dashboard.analysis",
          currentActiveMenu: "/dashboard",
          icon: "bx:bx-home",
        },
      },
      {
        path: "workbench",
        name: "Workbench",
        component: "/dashboard/workbench/index",
        meta: {
          hideMenu: true,
          hideBreadcrumb: true,
          title: "routes.dashboard.workbench",
          currentActiveMenu: "/dashboard",
          icon: "bx:bx-home",
        },
      },
    ],
  },
  {
    path: "/permission",
    name: "Permission",
    component: "LAYOUT",
    redirect: "/permission/front/page",
    meta: {
      icon: "carbon:user-role",
      title: "routes.demo.permission.permission",
    },
    children: [
      {
        path: "back",
        name: "PermissionBackDemo",
        meta: { title: "routes.demo.permission.back" },
        children: [
          {
            path: "page",
            name: "BackAuthPage",
            component: "/demo/permission/back/index",
            meta: { title: "routes.demo.permission.backPage" },
          },
          {
            path: "btn",
            name: "BackAuthBtn",
            component: "/demo/permission/back/Btn",
            meta: { title: "routes.demo.permission.backBtn" },
          },
        ],
      },
    ],
  },
  {
    path: "/level",
    name: "Level",
    component: "LAYOUT",
    redirect: "/level/menu1/menu1-1",
    meta: { icon: "carbon:user-role", title: "routes.demo.level.level" },
    children: [
      {
        path: "menu1",
        name: "Menu1Demo",
        meta: { title: "Menu1" },
        children: [
          {
            path: "menu1-1",
            name: "Menu11Demo",
            meta: { title: "Menu1-1" },
            children: [
              {
                path: "menu1-1-1",
                name: "Menu111Demo",
                component: "/demo/level/Menu111",
                meta: { title: "Menu111" },
              },
            ],
          },
          {
            path: "menu1-2",
            name: "Menu12Demo",
            component: "/demo/level/Menu12",
            meta: { title: "Menu1-2" },
          },
        ],
      },
      {
        path: "menu2",
        name: "Menu2Demo",
        component: "/demo/level/Menu2",
        meta: { title: "Menu2" },
      },
    ],
  },

  // 系统管理
  {
    path: "/system",
    name: "System",
    component: "LAYOUT",
    redirect: "/system/account",
    meta: {
      orderNo: 2000,
      icon: "ion:settings-outline",
      title: "routes.demo.system.moduleName",
    },
    children: [
      {
        path: "account",
        name: "AccountManagement",
        meta: {
          title: "routes.demo.system.account",
          ignoreKeepAlive: false,
        },
        component: "/demo/system/account/index.vue",
      },
      {
        path: "account_detail/:id",
        name: "AccountDetail",
        meta: {
          hideMenu: true,
          title: "routes.demo.system.account_detail",
          ignoreKeepAlive: true,
          showMenu: false,
          currentActiveMenu: "/system/account",
        },
        component: "/demo/system/account/AccountDetail.vue",
      },
      {
        path: "role",
        name: "RoleManagement",
        meta: {
          title: "routes.demo.system.role",
          ignoreKeepAlive: true,
        },
        component: "demo/system/role/index.vue",
      },

      {
        path: "menu",
        name: "MenuManagement",
        meta: {
          title: "routes.demo.system.menu",
          ignoreKeepAlive: true,
        },
        component: "demo/system/menu/index.vue",
      },
      {
        path: "dept",
        name: "DeptManagement",
        meta: {
          title: "routes.demo.system.dept",
          ignoreKeepAlive: true,
        },
        component: "demo/system/dept/index.vue",
      },
      {
        path: "changePassword",
        name: "ChangePassword",
        meta: {
          title: "routes.demo.system.password",
          ignoreKeepAlive: true,
        },
        component: "/demo/system/password/index.vue",
      },
    ],
  },

  {
    path: "/link",
    name: "Link",
    component: "LAYOUT",
    meta: { icon: "ion:tv-outline", title: "routes.demo.iframe.frame" },
    children: [
      {
        path: "doc",
        name: "Doc",
        meta: {
          title: "routes.demo.iframe.doc",
          frameSrc: "https://doc.vvbin.cn/",
        },
      },
      {
        path: "https://doc.vvbin.cn/",
        name: "DocExternal",
        component: "LAYOUT",
        meta: { title: "routes.demo.iframe.docExternal" },
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: "LAYOUT",
    redirect: "/about/index",
    meta: {
      hideChildrenInMenu: true,
      icon: "simple-icons:about-dot-me",
      title: "routes.dashboard.about",
      orderNo: 100000,
    },
    children: [
      {
        path: "index",
        name: "AboutPage",
        component: "/sys/about/index.vue",
        meta: {
          title: "routes.dashboard.about",
          icon: "simple-icons:about-dot-me",
          hideMenu: true,
        },
      },
    ],
  },

  // 测试
  {
    path: "/test",
    name: "Test",
    component: "LAYOUT",
    redirect: "/test/index",
    meta: {
      icon: "simple-icons:about-dot-me",
      title: "测试",
      hideChildrenInMenu: true,
    },
    children: [
      {
        path: "index",
        name: "TestPage",
        component: "/sys/about/index.vue",
        meta: {
          title: "测试",
          icon: "simple-icons:about-dot-me",
        },
      },
    ],
  },
];

// 获取菜单-系统管理
let dataMenuListSystem = [
  {
    id: "0",
    icon: "ion:layers-outline",
    component: "LAYOUT",
    type: "0",
    menuName: "Dashboard",
    permission: "",
    orderNo: 1,
    createTime: "2015-09-23 09:37:21",
    status: "0",
    children: [
      {
        id: "0-0",
        type: "1",
        menuName: "菜单1",
        icon: "ion:document",
        permission: "menu1:view",
        component: "/dashboard/welcome/index",
        orderNo: 1,
        createTime: "1975-11-27 21:25:02",
        status: "1",
        parentMenu: "0",
        children: [
          {
            id: "0-0-0",
            type: "2",
            menuName: "按钮1-1",
            icon: "",
            permission: "menu1:view:btn1",
            component: "/dashboard/welcome/index",
            orderNo: 1,
            createTime: "2009-02-08 14:32:08",
            status: "1",
            parentMenu: "0-0",
          },
          {
            id: "0-0-1",
            type: "2",
            menuName: "按钮1-2",
            icon: "",
            permission: "menu1:view:btn2",
            component: "/dashboard/welcome/index",
            orderNo: 1,
            createTime: "2007-06-02 23:14:29",
            status: "1",
            parentMenu: "0-0",
          },
          {
            id: "0-0-2",
            type: "2",
            menuName: "按钮1-3",
            icon: "",
            permission: "menu1:view:btn3",
            component: "/dashboard/welcome/index",
            orderNo: 1,
            createTime: "2007-06-29 03:35:02",
            status: "1",
            parentMenu: "0-0",
          },
          {
            id: "0-0-3",
            type: "2",
            menuName: "按钮1-4",
            icon: "",
            permission: "menu1:view:btn4",
            component: "/dashboard/welcome/index",
            orderNo: 1,
            createTime: "2022-08-05 03:27:06",
            status: "1",
            parentMenu: "0-0",
          },
        ],
      },
      {
        id: "0-1",
        type: "1",
        menuName: "菜单2",
        icon: "ion:document",
        permission: "menu1:view",
        component: "/dashboard/analysis/index",
        orderNo: 2,
        createTime: "1997-07-09 03:38:52",
        status: "0",
        parentMenu: "0",
        children: [
          {
            id: "0-1-0",
            type: "2",
            menuName: "按钮2-1",
            icon: "",
            permission: "menu1:view:btn1",
            component: "/dashboard/analysis/index",
            orderNo: 2,
            createTime: "1975-12-19 06:22:18",
            status: "1",
            parentMenu: "0-1",
          },
          {
            id: "0-1-1",
            type: "2",
            menuName: "按钮2-2",
            icon: "",
            permission: "menu1:view:btn2",
            component: "/dashboard/analysis/index",
            orderNo: 2,
            createTime: "2018-02-17 22:26:33",
            status: "0",
            parentMenu: "0-1",
          },
          {
            id: "0-1-2",
            type: "2",
            menuName: "按钮2-3",
            icon: "",
            permission: "menu1:view:btn3",
            component: "/dashboard/analysis/index",
            orderNo: 2,
            createTime: "2011-01-06 14:37:58",
            status: "0",
            parentMenu: "0-1",
          },
          {
            id: "0-1-3",
            type: "2",
            menuName: "按钮2-4",
            icon: "",
            permission: "menu1:view:btn4",
            component: "/dashboard/analysis/index",
            orderNo: 2,
            createTime: "2009-02-15 04:55:28",
            status: "0",
            parentMenu: "0-1",
          },
        ],
      },
      {
        id: "0-2",
        type: "1",
        menuName: "菜单3",
        icon: "ion:document",
        permission: "menu1:view",
        component: "/dashboard/workbench/index",
        orderNo: 3,
        createTime: "1985-04-20 04:32:56",
        status: "0",
        parentMenu: "0",
        children: [
          {
            id: "0-2-0",
            type: "2",
            menuName: "按钮3-1",
            icon: "",
            permission: "menu1:view:btn1",
            component: "/dashboard/workbench/index",
            orderNo: 3,
            createTime: "1982-09-30 17:22:55",
            status: "0",
            parentMenu: "0-2",
          },
          {
            id: "0-2-1",
            type: "2",
            menuName: "按钮3-2",
            icon: "",
            permission: "menu1:view:btn2",
            component: "/dashboard/workbench/index",
            orderNo: 3,
            createTime: "2005-03-06 01:59:03",
            status: "1",
            parentMenu: "0-2",
          },
          {
            id: "0-2-2",
            type: "2",
            menuName: "按钮3-3",
            icon: "",
            permission: "menu1:view:btn3",
            component: "/dashboard/workbench/index",
            orderNo: 3,
            createTime: "2007-05-08 11:58:03",
            status: "0",
            parentMenu: "0-2",
          },
          {
            id: "0-2-3",
            type: "2",
            menuName: "按钮3-4",
            icon: "",
            permission: "menu1:view:btn4",
            component: "/dashboard/workbench/index",
            orderNo: 3,
            createTime: "2014-08-13 15:50:39",
            status: "1",
            parentMenu: "0-2",
          },
        ],
      },
      {
        id: "0-3",
        type: "1",
        menuName: "菜单4",
        icon: "ion:document",
        permission: "menu1:view",
        component: "/dashboard/test/index",
        orderNo: 4,
        createTime: "1977-02-13 19:29:04",
        status: "1",
        parentMenu: "0",
        children: [
          {
            id: "0-3-0",
            type: "2",
            menuName: "按钮4-1",
            icon: "",
            permission: "menu1:view:btn1",
            component: "/dashboard/test/index",
            orderNo: 4,
            createTime: "2004-03-28 20:35:40",
            status: "1",
            parentMenu: "0-3",
          },
          {
            id: "0-3-1",
            type: "2",
            menuName: "按钮4-2",
            icon: "",
            permission: "menu1:view:btn2",
            component: "/dashboard/test/index",
            orderNo: 4,
            createTime: "1987-05-10 06:02:38",
            status: "0",
            parentMenu: "0-3",
          },
          {
            id: "0-3-2",
            type: "2",
            menuName: "按钮4-3",
            icon: "",
            permission: "menu1:view:btn3",
            component: "/dashboard/test/index",
            orderNo: 4,
            createTime: "1980-06-20 16:22:40",
            status: "1",
            parentMenu: "0-3",
          },
          {
            id: "0-3-3",
            type: "2",
            menuName: "按钮4-4",
            icon: "",
            permission: "menu1:view:btn4",
            component: "/dashboard/test/index",
            orderNo: 4,
            createTime: "1999-11-09 21:08:15",
            status: "0",
            parentMenu: "0-3",
          },
        ],
      },
    ],
  },
  {
    id: "1",
    icon: "ion:git-compare-outline",
    component: "LAYOUT",
    type: "0",
    menuName: "权限管理",
    permission: "",
    orderNo: 2,
    createTime: "1993-06-25 04:56:03",
    status: "1",
    children: [
      {
        id: "1-0",
        type: "1",
        menuName: "菜单1",
        icon: "ion:document",
        permission: "menu2:add",
        component: "/dashboard/welcome/index",
        orderNo: 1,
        createTime: "1982-10-22 20:31:21",
        status: "0",
        parentMenu: "1",
        children: [
          {
            id: "1-0-0",
            type: "2",
            menuName: "按钮1-1",
            icon: "",
            permission: "menu2:add:btn1",
            component: "/dashboard/welcome/index",
            orderNo: 1,
            createTime: "1998-06-04 21:50:55",
            status: "1",
            parentMenu: "1-0",
          },
          {
            id: "1-0-1",
            type: "2",
            menuName: "按钮1-2",
            icon: "",
            permission: "menu2:add:btn2",
            component: "/dashboard/welcome/index",
            orderNo: 1,
            createTime: "1996-08-03 03:30:56",
            status: "1",
            parentMenu: "1-0",
          },
          {
            id: "1-0-2",
            type: "2",
            menuName: "按钮1-3",
            icon: "",
            permission: "menu2:add:btn3",
            component: "/dashboard/welcome/index",
            orderNo: 1,
            createTime: "2009-09-29 20:35:27",
            status: "0",
            parentMenu: "1-0",
          },
          {
            id: "1-0-3",
            type: "2",
            menuName: "按钮1-4",
            icon: "",
            permission: "menu2:add:btn4",
            component: "/dashboard/welcome/index",
            orderNo: 1,
            createTime: "2005-07-25 04:15:31",
            status: "1",
            parentMenu: "1-0",
          },
        ],
      },
      {
        id: "1-1",
        type: "1",
        menuName: "菜单2",
        icon: "ion:document",
        permission: "menu2:add",
        component: "/dashboard/analysis/index",
        orderNo: 2,
        createTime: "2022-10-22 04:52:53",
        status: "1",
        parentMenu: "1",
        children: [
          {
            id: "1-1-0",
            type: "2",
            menuName: "按钮2-1",
            icon: "",
            permission: "menu2:add:btn1",
            component: "/dashboard/analysis/index",
            orderNo: 2,
            createTime: "2009-02-10 08:10:48",
            status: "0",
            parentMenu: "1-1",
          },
          {
            id: "1-1-1",
            type: "2",
            menuName: "按钮2-2",
            icon: "",
            permission: "menu2:add:btn2",
            component: "/dashboard/analysis/index",
            orderNo: 2,
            createTime: "2016-11-12 02:41:24",
            status: "1",
            parentMenu: "1-1",
          },
          {
            id: "1-1-2",
            type: "2",
            menuName: "按钮2-3",
            icon: "",
            permission: "menu2:add:btn3",
            component: "/dashboard/analysis/index",
            orderNo: 2,
            createTime: "2009-02-25 17:54:28",
            status: "1",
            parentMenu: "1-1",
          },
          {
            id: "1-1-3",
            type: "2",
            menuName: "按钮2-4",
            icon: "",
            permission: "menu2:add:btn4",
            component: "/dashboard/analysis/index",
            orderNo: 2,
            createTime: "1974-07-21 06:50:22",
            status: "1",
            parentMenu: "1-1",
          },
        ],
      },
      {
        id: "1-2",
        type: "1",
        menuName: "菜单3",
        icon: "ion:document",
        permission: "menu2:add",
        component: "/dashboard/workbench/index",
        orderNo: 3,
        createTime: "2021-09-15 09:54:01",
        status: "0",
        parentMenu: "1",
        children: [
          {
            id: "1-2-0",
            type: "2",
            menuName: "按钮3-1",
            icon: "",
            permission: "menu2:add:btn1",
            component: "/dashboard/workbench/index",
            orderNo: 3,
            createTime: "2002-07-28 09:11:07",
            status: "0",
            parentMenu: "1-2",
          },
          {
            id: "1-2-1",
            type: "2",
            menuName: "按钮3-2",
            icon: "",
            permission: "menu2:add:btn2",
            component: "/dashboard/workbench/index",
            orderNo: 3,
            createTime: "2004-12-27 23:04:23",
            status: "1",
            parentMenu: "1-2",
          },
          {
            id: "1-2-2",
            type: "2",
            menuName: "按钮3-3",
            icon: "",
            permission: "menu2:add:btn3",
            component: "/dashboard/workbench/index",
            orderNo: 3,
            createTime: "1974-11-18 07:25:29",
            status: "0",
            parentMenu: "1-2",
          },
          {
            id: "1-2-3",
            type: "2",
            menuName: "按钮3-4",
            icon: "",
            permission: "menu2:add:btn4",
            component: "/dashboard/workbench/index",
            orderNo: 3,
            createTime: "1997-04-18 18:51:51",
            status: "0",
            parentMenu: "1-2",
          },
        ],
      },
      {
        id: "1-3",
        type: "1",
        menuName: "菜单4",
        icon: "ion:document",
        permission: "menu2:add",
        component: "/dashboard/test/index",
        orderNo: 4,
        createTime: "1976-06-06 22:53:28",
        status: "1",
        parentMenu: "1",
        children: [
          {
            id: "1-3-0",
            type: "2",
            menuName: "按钮4-1",
            icon: "",
            permission: "menu2:add:btn1",
            component: "/dashboard/test/index",
            orderNo: 4,
            createTime: "2004-04-25 18:44:16",
            status: "0",
            parentMenu: "1-3",
          },
          {
            id: "1-3-1",
            type: "2",
            menuName: "按钮4-2",
            icon: "",
            permission: "menu2:add:btn2",
            component: "/dashboard/test/index",
            orderNo: 4,
            createTime: "2001-07-09 18:12:21",
            status: "0",
            parentMenu: "1-3",
          },
          {
            id: "1-3-2",
            type: "2",
            menuName: "按钮4-3",
            icon: "",
            permission: "menu2:add:btn3",
            component: "/dashboard/test/index",
            orderNo: 4,
            createTime: "1977-06-16 16:56:04",
            status: "0",
            parentMenu: "1-3",
          },
          {
            id: "1-3-3",
            type: "2",
            menuName: "按钮4-4",
            icon: "",
            permission: "menu2:add:btn4",
            component: "/dashboard/test/index",
            orderNo: 4,
            createTime: "2001-03-03 16:04:39",
            status: "0",
            parentMenu: "1-3",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    icon: "ion:tv-outline",
    component: "LAYOUT",
    type: "0",
    menuName: "功能",
    permission: "",
    orderNo: 3,
    createTime: "1990-10-01 01:20:57",
    status: "0",
    children: [
      {
        id: "2-0",
        type: "1",
        menuName: "菜单1",
        icon: "ion:document",
        permission: "menu3:update",
        component: "/dashboard/welcome/index",
        orderNo: 1,
        createTime: "1976-03-24 04:40:30",
        status: "0",
        parentMenu: "2",
        children: [
          {
            id: "2-0-0",
            type: "2",
            menuName: "按钮1-1",
            icon: "",
            permission: "menu3:update:btn1",
            component: "/dashboard/welcome/index",
            orderNo: 1,
            createTime: "2020-03-28 04:02:10",
            status: "1",
            parentMenu: "2-0",
          },
          {
            id: "2-0-1",
            type: "2",
            menuName: "按钮1-2",
            icon: "",
            permission: "menu3:update:btn2",
            component: "/dashboard/welcome/index",
            orderNo: 1,
            createTime: "2008-02-01 10:06:49",
            status: "0",
            parentMenu: "2-0",
          },
          {
            id: "2-0-2",
            type: "2",
            menuName: "按钮1-3",
            icon: "",
            permission: "menu3:update:btn3",
            component: "/dashboard/welcome/index",
            orderNo: 1,
            createTime: "2007-03-08 18:00:44",
            status: "1",
            parentMenu: "2-0",
          },
          {
            id: "2-0-3",
            type: "2",
            menuName: "按钮1-4",
            icon: "",
            permission: "menu3:update:btn4",
            component: "/dashboard/welcome/index",
            orderNo: 1,
            createTime: "2008-02-21 11:40:00",
            status: "1",
            parentMenu: "2-0",
          },
        ],
      },
      {
        id: "2-1",
        type: "1",
        menuName: "菜单2",
        icon: "ion:document",
        permission: "menu3:update",
        component: "/dashboard/analysis/index",
        orderNo: 2,
        createTime: "1985-11-20 04:46:44",
        status: "1",
        parentMenu: "2",
        children: [
          {
            id: "2-1-0",
            type: "2",
            menuName: "按钮2-1",
            icon: "",
            permission: "menu3:update:btn1",
            component: "/dashboard/analysis/index",
            orderNo: 2,
            createTime: "2018-12-02 01:31:57",
            status: "1",
            parentMenu: "2-1",
          },
          {
            id: "2-1-1",
            type: "2",
            menuName: "按钮2-2",
            icon: "",
            permission: "menu3:update:btn2",
            component: "/dashboard/analysis/index",
            orderNo: 2,
            createTime: "2000-04-16 11:36:28",
            status: "0",
            parentMenu: "2-1",
          },
          {
            id: "2-1-2",
            type: "2",
            menuName: "按钮2-3",
            icon: "",
            permission: "menu3:update:btn3",
            component: "/dashboard/analysis/index",
            orderNo: 2,
            createTime: "2007-09-07 22:43:56",
            status: "0",
            parentMenu: "2-1",
          },
          {
            id: "2-1-3",
            type: "2",
            menuName: "按钮2-4",
            icon: "",
            permission: "menu3:update:btn4",
            component: "/dashboard/analysis/index",
            orderNo: 2,
            createTime: "2012-03-28 18:46:07",
            status: "0",
            parentMenu: "2-1",
          },
        ],
      },
      {
        id: "2-2",
        type: "1",
        menuName: "菜单3",
        icon: "ion:document",
        permission: "menu3:update",
        component: "/dashboard/workbench/index",
        orderNo: 3,
        createTime: "1995-01-04 13:13:20",
        status: "1",
        parentMenu: "2",
        children: [
          {
            id: "2-2-0",
            type: "2",
            menuName: "按钮3-1",
            icon: "",
            permission: "menu3:update:btn1",
            component: "/dashboard/workbench/index",
            orderNo: 3,
            createTime: "1993-03-07 08:02:36",
            status: "1",
            parentMenu: "2-2",
          },
          {
            id: "2-2-1",
            type: "2",
            menuName: "按钮3-2",
            icon: "",
            permission: "menu3:update:btn2",
            component: "/dashboard/workbench/index",
            orderNo: 3,
            createTime: "1974-04-01 13:09:02",
            status: "1",
            parentMenu: "2-2",
          },
          {
            id: "2-2-2",
            type: "2",
            menuName: "按钮3-3",
            icon: "",
            permission: "menu3:update:btn3",
            component: "/dashboard/workbench/index",
            orderNo: 3,
            createTime: "2022-03-25 20:45:53",
            status: "1",
            parentMenu: "2-2",
          },
          {
            id: "2-2-3",
            type: "2",
            menuName: "按钮3-4",
            icon: "",
            permission: "menu3:update:btn4",
            component: "/dashboard/workbench/index",
            orderNo: 3,
            createTime: "1983-05-03 14:14:08",
            status: "1",
            parentMenu: "2-2",
          },
        ],
      },
      {
        id: "2-3",
        type: "1",
        menuName: "菜单4",
        icon: "ion:document",
        permission: "menu3:update",
        component: "/dashboard/test/index",
        orderNo: 4,
        createTime: "2017-07-15 04:16:28",
        status: "1",
        parentMenu: "2",
        children: [
          {
            id: "2-3-0",
            type: "2",
            menuName: "按钮4-1",
            icon: "",
            permission: "menu3:update:btn1",
            component: "/dashboard/test/index",
            orderNo: 4,
            createTime: "2013-01-15 14:30:08",
            status: "1",
            parentMenu: "2-3",
          },
          {
            id: "2-3-1",
            type: "2",
            menuName: "按钮4-2",
            icon: "",
            permission: "menu3:update:btn2",
            component: "/dashboard/test/index",
            orderNo: 4,
            createTime: "2013-07-06 11:57:10",
            status: "1",
            parentMenu: "2-3",
          },
          {
            id: "2-3-2",
            type: "2",
            menuName: "按钮4-3",
            icon: "",
            permission: "menu3:update:btn3",
            component: "/dashboard/test/index",
            orderNo: 4,
            createTime: "2001-10-11 19:45:42",
            status: "0",
            parentMenu: "2-3",
          },
          {
            id: "2-3-3",
            type: "2",
            menuName: "按钮4-4",
            icon: "",
            permission: "menu3:update:btn4",
            component: "/dashboard/test/index",
            orderNo: 4,
            createTime: "1988-04-05 04:10:45",
            status: "1",
            parentMenu: "2-3",
          },
        ],
      },
    ],
  },
];

// 部门列表
let dataDeptList = [
  {
    id: "0",
    deptName: "华东分部",
    orderNo: 1,
    createTime: "2017-04-03 03:41:40",
    remark: "情二今引车你布斯委保选以况备真义青长",
    status: "0",
    children: [
      {
        id: "0-0",
        deptName: "研发部",
        orderNo: 1,
        createTime: "2011-06-07 06:07:13",
        remark: "细回书处处技强色号子走命",
        status: "1",
        parentDept: "0",
      },
      {
        id: "0-1",
        deptName: "市场部",
        orderNo: 2,
        createTime: "2019-11-29 09:47:07",
        remark: "分非始却查正果转写除太写任身件八步共时",
        status: "0",
        parentDept: "0",
      },
      {
        id: "0-2",
        deptName: "商务部",
        orderNo: 3,
        createTime: "1979-02-18 14:13:05",
        remark: "事声条西对以律活意太石山其毛写产并",
        status: "0",
        parentDept: "0",
      },
      {
        id: "0-3",
        deptName: "财务部",
        orderNo: 4,
        createTime: "2019-09-05 07:59:51",
        remark: "管意反便活族新例增任务",
        status: "1",
        parentDept: "0",
      },
    ],
  },
  {
    id: "1",
    deptName: "华南分部",
    orderNo: 2,
    createTime: "2018-11-10 16:42:58",
    remark: "业月经新观论适最己重路整总其各格只如她",
    status: "0",
    children: [
      {
        id: "1-0",
        deptName: "研发部",
        orderNo: 1,
        createTime: "1997-04-27 00:53:56",
        remark: "取圆力和产元王传展看很好起作些元",
        status: "1",
        parentDept: "1",
      },
      {
        id: "1-1",
        deptName: "市场部",
        orderNo: 2,
        createTime: "1970-07-17 04:55:59",
        remark: "长看重南边式育须说增万如",
        status: "0",
        parentDept: "1",
      },
      {
        id: "1-2",
        deptName: "商务部",
        orderNo: 3,
        createTime: "2010-10-01 07:14:16",
        remark: "作代级形格消角开么率究素来",
        status: "0",
        parentDept: "1",
      },
      {
        id: "1-3",
        deptName: "财务部",
        orderNo: 4,
        createTime: "2019-11-24 06:55:32",
        remark: "成交矿他即做任算商形组生",
        status: "0",
        parentDept: "1",
      },
    ],
  },
  {
    id: "2",
    deptName: "西北分部",
    orderNo: 3,
    createTime: "1981-03-10 22:46:15",
    remark: "类那确里情通见自天志活正消只记",
    status: "1",
    children: [
      {
        id: "2-0",
        deptName: "研发部",
        orderNo: 1,
        createTime: "1987-02-13 02:15:16",
        remark: "委受你由划传些生应间阶导",
        status: "1",
        parentDept: "2",
      },
      {
        id: "2-1",
        deptName: "市场部",
        orderNo: 2,
        createTime: "1985-09-20 21:00:50",
        remark: "期龙可整立意织白式议技局复方率共历认府组",
        status: "0",
        parentDept: "2",
      },
      {
        id: "2-2",
        deptName: "商务部",
        orderNo: 3,
        createTime: "1995-06-12 19:52:38",
        remark: "界数层国来其信完快表太又根花为素商但",
        status: "1",
        parentDept: "2",
      },
      {
        id: "2-3",
        deptName: "财务部",
        orderNo: 4,
        createTime: "1978-01-11 22:25:54",
        remark: "压要发正上可前算他位存称状",
        status: "0",
        parentDept: "2",
      },
    ],
  },
];

// 账号列表
let dataAccountList = {
  items: [
    {
      id: "0",
      account: "John",
      email: "k.hbwvqx@lfpqsu.bb",
      nickname: "董桂英",
      role: "Elizabeth",
      createTime: "1976-10-23 06:58:47",
      remark: "电研公则就常领日一历等她造其状农系",
      status: "0",
    },
    {
      id: "1",
      account: "Helen",
      email: "h.tgxqgtszmu@zfnv.ml",
      nickname: "钱秀英",
      role: "Jose",
      createTime: "2008-04-14 00:42:34",
      remark: "革解济世没带展拉经但派月片五天研除把",
      status: "1",
    },
    {
      id: "2",
      account: "Michelle",
      email: "i.eeto@lraokqsu.uy",
      nickname: "阎超",
      role: "Jose",
      createTime: "1985-01-09 03:50:34",
      remark: "经联体业主选制家由可越查体光而可细必规书",
      status: "1",
    },
    {
      id: "3",
      account: "Larry",
      email: "d.bgxhdtff@towwgikb.nu",
      nickname: "康涛",
      role: "Michelle",
      createTime: "2021-07-23 01:30:02",
      remark: "队着日少需标始史按际",
      status: "0",
    },
    {
      id: "4",
      account: "Linda",
      email: "w.mhbdpkwzv@bqmid.ag",
      nickname: "徐娟",
      role: "Michelle",
      createTime: "2007-07-16 21:30:40",
      remark: "给老团红群世多什圆府值带是权标质",
      status: "0",
    },
    {
      id: "5",
      account: "Kimberly",
      email: "q.pivnpddkbo@urbj.af",
      nickname: "蒋芳",
      role: "Amy",
      createTime: "1980-03-29 23:55:36",
      remark: "号马白始提历不火七张南育计克它化",
      status: "0",
    },
    {
      id: "6",
      account: "Donna",
      email: "d.oqihr@nusyt.fo",
      nickname: "李刚",
      role: "Patricia",
      createTime: "1995-09-24 10:27:54",
      remark: "类元运不空构但图少领面见",
      status: "0",
    },
    {
      id: "7",
      account: "Mark",
      email: "f.vhewe@pjlrllscj.bj",
      nickname: "苏磊",
      role: "George",
      createTime: "1980-05-06 06:05:17",
      remark: "质局达果压至系离色老场明单具根",
      status: "0",
    },
    {
      id: "8",
      account: "Anna",
      email: "m.owsfqhp@npytcs.bh",
      nickname: "李洋",
      role: "Thomas",
      createTime: "2021-09-28 02:02:24",
      remark: "火况系将几务或济拉展那满今眼",
      status: "0",
    },
    {
      id: "9",
      account: "Deborah",
      email: "u.jcpxuh@pmyghmixb.bf",
      nickname: "邓磊",
      role: "Richard",
      createTime: "1976-12-25 13:53:00",
      remark: "质头速本热断干断原话转则二线证日工",
      status: "0",
    },
  ],
  total: 20,
};

// 角色列表
let dataRoleList = [
  {
    id: 1,
    orderNo: "1",
    roleName: "超级管理员",
    roleValue: "Matthew",
    createTime: "1991-12-13 19:37:55",
    remark: "次机明第手素位近到拉复感",
    menu: ["0", "1", "2"],
    status: "0",
  },
  {
    id: 2,
    orderNo: "2",
    roleName: "管理员",
    roleValue: "Larry",
    createTime: "2004-12-15 21:08:11",
    remark: "直此那酸世万般信指象众因论直",
    menu: ["0", "1"],
    status: "0",
  },
  {
    id: 3,
    orderNo: "3",
    roleName: "文章管理员",
    roleValue: "Michael",
    createTime: "2018-01-06 05:02:35",
    remark: "国心确两西十即七万变用但",
    menu: ["0", "2"],
    status: "0",
  },
  {
    id: 4,
    orderNo: "4",
    roleName: "普通用户",
    roleValue: "Patricia",
    createTime: "1993-09-03 23:49:54",
    remark: "火年先领称型受个料目规次具育传专",
    menu: ["2"],
    status: "0",
  },
];

// 角色列表
let dataRoleListPage = {
  items: [
    {
      id: 1,
      orderNo: "1",
      roleName: "超级管理员",
      roleValue: "Richard",
      createTime: "2002-05-19 02:18:23",
      remark: "派相外济如有身设建等给查近",
      menu: ["0", "1", "2"],
      status: "1",
    },
    {
      id: 2,
      orderNo: "2",
      roleName: "管理员",
      roleValue: "Paul",
      createTime: "2010-11-02 12:49:35",
      remark: "总命土容酸位强农为两",
      menu: ["0", "1"],
      status: "0",
    },
    {
      id: 3,
      orderNo: "3",
      roleName: "文章管理员",
      roleValue: "Laura",
      createTime: "2022-07-31 05:06:54",
      remark: "元上技选起研物示及从自给",
      menu: ["0", "2"],
      status: "0",
    },
    {
      id: 4,
      orderNo: "4",
      roleName: "普通用户",
      roleValue: "Scott",
      createTime: "1983-04-08 22:43:46",
      remark: "状多四立马表群每确走由并层组正计",
      menu: ["2"],
      status: "1",
    },
  ],
  total: 4,
};

export class AdminController {
  private userRepository = AppDataSource.getRepository(User);
  private deptListRepository = AppDataSource.getRepository(DeptList);

  // 获取菜单
  async getMenuList(request: Request, response: Response, next: NextFunction) {
    console.log("菜单1");
    // next();

    return resFormatSuccess({ data: dataMenuList });
  }

  // 获取菜单-系统管理
  async systemGetMenuList(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return resFormatSuccess({ data: dataMenuListSystem });
  }

  // 获取个人信息
  async getUserInfo(request: Request, response: Response, next: NextFunction) {
    let data = {
      userId: "1",
      username: "vben",
      realName: "Vben Admin",
      avatar: "",
      desc: "manager",
      password: "123456",
      token: "fakeToken1",
      homePath: "/dashboard/analysis",
      roles: [{ roleName: "Super Admin", value: "super" }],
    };

    // let user = await this.userRepository.findOne({
    //   where: {
    //     username: request.body.username,
    //   },
    // });

    return resFormatSuccess({ data: data });
  }

  // 获取个人信息
  async accountExist(request: Request, response: Response, next: NextFunction) {
    const { account } = request.body;

    if (account && account.indexOf("admin") !== -1) {
      return resFormatError({ msg: "该字段不能包含admin" });
    } else {
      return resFormatSuccess({ msg: `${account} can use` });
    }
  }

  // 新增 / 编辑 部门
  async addDept(request: Request, response: Response, next: NextFunction) {
    try {
      console.log(request.body, "参数");
      let ent = new DeptList();

      ent.deptName = request.body.deptName;
      ent.orderNo = request.body.orderNo;
      ent.status = request.body.status;
      ent.remark = request.body.remark;
      ent.parentDept = request.body.parentDept;

      if (request.body.id) {
        ent.id = request.body.id;
      }

      let res = await this.deptListRepository.save(ent);
      return resFormatSuccess();
    } catch (error) {
      console.log(error.message, "错误1");
      return resFormatError({ msg: error.message });
    }
  }

  // 删除 部门
  async deleteDept(request: Request, response: Response, next: NextFunction) {
    try {
      console.log(request.body, "参数");

      let res = await this.deptListRepository.delete({
        id: request.body.id,
      });

      return resFormatSuccess();
    } catch (error) {
      console.log(error.message, "错误1");
      return resFormatError({ msg: error.message });
    }
  }

  // 获取部门列表
  async getDeptList(request: Request, response: Response, next: NextFunction) {
    try {
      let res = await this.deptListRepository.find();
      return resFormatSuccess({
        data: res,
      });
    } catch (error) {
      console.log(error.message, "错误1");
      return resFormatError({ msg: error.message });
    }
  }

  // 获取角色列表
  async getAllRoleList(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return resFormatSuccess({ data: dataRoleList });
  }

  // 获取角色列表分页
  async getRoleListByPage(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return resFormatSuccess({ data: dataRoleListPage });
  }

  // 获取账号列表
  async getAccountList(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return resFormatSuccess({ data: dataAccountList });
  }

  // 获取权限码
  async getPermCode(request: Request, response: Response, next: NextFunction) {
    let data = ["1000", "3000", "5000"];

    return resFormatSuccess({ data: data });
  }

  // 退出
  async logout(request: Request, response: Response, next: NextFunction) {
    return resFormatSuccess({ msg: "Token has been destroyed" });
  }

  // 登录
  async login(request: Request, response: Response, next: NextFunction) {
    let user = await this.userRepository.findOne({
      where: {
        username: request.body.username,
      },
    });

    let verifyRes;
    if (user) {
      verifyRes = await verifyHash(request.body.password, user.password);
    }

    console.log(request.body, user, verifyRes, "参数1");

    if (verifyRes) {
      let data = {
        roles: user.roles || [],
        userId: user.id,
        username: user.username,
        token: "fakeToken1",
        nickname: user.nickname,
        desc: "备注",
      };

      return resFormatSuccess({ data: data });
    } else {
      return resFormatError({ msg: "用户名或密码错误" });
    }
  }
}
