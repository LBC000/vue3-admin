let getMenuList = {
  code: 0,
  result: [
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
  ],
  message: "ok",
  type: "success",
};
