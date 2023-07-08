import type { IconifyIcon } from "@iconify/vue";

const { VITE_HIDE_HOME } = import.meta.env;
export const routerArrays: Array<RouteConfigs> =
  VITE_HIDE_HOME === "false"
    ? [
        {
          path: "/welcome",
          meta: {
            title: "menus.hshome",
            icon: "homeFilled"
          }
        }
      ]
    : [];

export type routeMetaType = {
  title?: string;
  icon?: string | IconifyIcon;
  showLink?: boolean;
  savedPosition?: boolean;
  auths?: string[];
};

export type RouteConfigs = {
  path?: string;
  query?: object;
  params?: object;
  meta?: routeMetaType;
  children?: RouteConfigs;
  name?: string;
};

export type multiTagsType = {
  tags: RouteConfigs[];
};

