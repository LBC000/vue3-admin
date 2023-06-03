/**
The routing of this file will not show the layout.
It is an independent new page.
the contents of the file still need to log in to access
 */
import type { AppRouteModule } from '/@/router/types';

// test
// http:ip:port/main-out
export const mainOutRoutes: AppRouteModule[] = [
  {
    path: '/main-out',
    name: 'MainOut',
    component: () => import('/@/views/demo/main-out/index.vue'),
    meta: {
      title: 'MainOut',
      ignoreAuth: true,
    },
  },
  {
    path: '/register-super-admin',
    name: 'RegisterSuperAdmin',
    component: () => import('/@/views/sys/register-super-admin/register-super-admin.vue'),
    meta: {
      title: 'RegisterSuperAdmin',
      ignoreAuth: true,
    },
  },
];

export const mainOutRouteNames = mainOutRoutes.map((item) => item.name);
