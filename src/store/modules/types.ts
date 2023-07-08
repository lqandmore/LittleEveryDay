import { RouteRecordName } from "vue-router";

export type userType = {
  username?: string;
  roles?: string[];
  verifyCode?: string;
  currentPage?: number;
};

export type cacheType = {
  mode: string;
  name?: RouteRecordName;
};

export type positionType = {
  startIndex?: number;
  length?: number;
};

export type multiType = {
  path: string;
  name: string;
  meta: any;
  query?: object;
  params?: object;
};

export type appType = {
  sideBar: {
    opened: boolean;
    withoutAnimation: boolean;
    isClickCollapse: boolean;
  };
  layout: string;
  device: string;
  sortSwap: boolean;
};

export type setType = {
  title: string;
  fixedHeader: boolean;
  hiddenSideBar: boolean;
};
