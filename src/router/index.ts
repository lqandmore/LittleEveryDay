import {
  Router,
  createRouter,
  RouteRecordRaw,
  RouteComponent
} from "vue-router";
import { getHistoryMode } from "./utils";
export const router: Router = createRouter({
  history: getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY),
  routes: [],
  strict: true,
  scrollBehavior: (_to, from, savedPosition) => {
    return new Promise(reslove => {
      if (savedPosition) {
        reslove(savedPosition);
      } else {
        if (from.meta.saveScrollTop) {
          const top: number =
            document.documentElement.scrollTop || document.body.scrollTop;
          reslove({ left: 0, top });
        }
      }
    });
  }
});

router.beforeEach((to, _from, next) => {
  if (to.meta?.keepAlive) {
  }
  next();
});
