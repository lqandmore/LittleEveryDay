import { DataInfo, sessionKey } from "./../../utils/auth";
import {
  RouterHistory,
  RouteComponent,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw
} from "vue-router";
import { getConfig } from "../config";
import {
  storageSession,
  cloneDeep,
  buildHierarchyTree,
  intersection,
  isEmpty
} from "@pureadmin/utils";
import { getAsyncRoutes } from "api/routes";
import { usePermissionStoreHook } from "@/store/modules/permission";

function getHistoryMode(routerHistory: string): RouterHistory {
  const historyMode: string[] = routerHistory.split(",");
  const leftMode = historyMode[0];
  const rightMode = historyMode[1];

  if (historyMode.length === 1) {
    if (leftMode === "hash") {
      return createWebHashHistory();
    } else if (leftMode === "h5") {
      return createWebHistory();
    }
  } else if (historyMode.length === 2) {
    if (leftMode === "hash") {
      return createWebHistory(rightMode);
    } else if (leftMode === "h5") {
      return createWebHashHistory(rightMode);
    }
  }
  return createWebHashHistory();
}

function handRank(routeInfo: any) {
  const { name, path, parentId, meta } = routeInfo;
  return isEmpty(parentId)
    ? isEmpty(meta?.rank) ||
      (meta?.rank === 0 && name !== "Home" && path !== "/")
      ? true
      : false
    : false;
}

function ascending(arr: any[]) {
  arr.forEach((v, index) => {
    if (handRank(v)) v.meta.rank = index + 2;
  });

  return arr.sort(
    (a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
      return a?.meta.rank - b?.meta.rank;
    }
  );
}

function filterTree(data: RouteComponent[]) {
  const newTree = cloneDeep(data).filter(
    (v: { meta: { showLink: boolean } }) => v.meta?.showLink !== false
  );
  newTree.forEach((v: { children: RouteComponent[] }) => {
    if (v.children) {
      v.children = filterTree(v.children);
    }
  });
  return newTree;
}

function filterChildrenTree(data: RouteComponent[]) {
  const newTree = cloneDeep(data).filter((v: any) => v?.children?.length !== 0);
  newTree.forEach((v: { children: RouteComponent[] }) => {
    v.children && (v.children = filterTree(v.children));
  });
}

function isOneOfArray(a: Array<string>, b: Array<string>) {
  return Array.isArray(a) && Array.isArray(b)
    ? intersection(a, b).length > 0
      ? true
      : false
    : true;
}

function filterNoPermissionTree(data: RouteComponent[]) {
  const currentRoles =
    storageSession().getItem<DataInfo<number>>(sessionKey)?.roles ?? [];
  const newTree = cloneDeep(data).filter((v: any) =>
    isOneOfArray(v.meta?.roles, currentRoles)
  );
  newTree.forEach((v: any) => {
    v.children && (v.children = filterNoPermissionTree(v.children));
  });
  return newTree;
}

function handleAsyncRoutes(routeList: any) {
  if (routeList.length === 0) {
    usePermissionStoreHook().handleWholeMenus(routeList);
  } else {
    formatFlatteningRoutes(addAsyncRoutes(routeList))?.map();
  }
}

function initRouter() {
  if (getConfig()?.CachingAsyncRoutes) {
    const key = "async-routes";
    const asyncRouteList = storageSession().getItem(key) as any;
    if (asyncRouteList && asyncRouteList.length > 0) {
      return new Promise(resolve => {
        handleAsyncRoutes(asyncRouteList);
        resolve(asyncRouteList);
      });
    } else {
      return new Promise(resolve => {
        getAsyncRoutes().then(({ data }) => {
          handleAsyncRoutes(data);
          storageSession().setItem(key, data);
          resolve(data);
        });
      });
    }
  } else {
    return new Promise(resolve => {
      getAsyncRoutes().then(({ data }) => {
        handleAsyncRoutes(data);
        resolve(data);
      });
    });
  }
}

function formatFlatteningRoutes(routeList: RouteRecordRaw[]) {
  if (routeList.length === 0) {
    return routeList;
  }
  let hierarchyList = buildHierarchyTree(routeList);
  for (let i = 0; i < hierarchyList.length; i++) {
    if (hierarchyList[i].children) {
      hierarchyList = hierarchyList
        .slice(0, i + 1)
        .concat(hierarchyList[i].children, hierarchyList.slice(i + 1));
    }
  }
}

function formatTwoStageRoutes(routeList: RouteRecordRaw[]) {
  if (routeList.length === 0) {
    return routeList;
  }
  const newRouteList: RouteRecordRaw[] = [];
  routeList.forEach((v: RouteRecordRaw) => {
    if (v.path === "/") {
      newRouteList.push({
        component: v.component,
        name: v.name,
        path: v.path,
        redirect: v.redirect,
        meta: v.meta,
        children: []
      });
    } else {
      newRouteList[0]?.children?.push({ ...v });
    }
  });
}

function handleAliveRoute({ name }: ToRouteType, mode?: string) {
  switch (mode) {
    case "add":
    case "refresh":
    case "delete":
      usePermissionStoreHook().cacheOperate({
        mode,
        name
      });
      break;
    default:
      usePermissionStoreHook().cacheOperate({
        mode: "delete",
        name
      });
      useTimeoutFn(() => {
        usePermissionStoreHook().cacheOperate({
          mode: "add",
          name
        });
      }, 100);
  }
}

function addAsyncRoutes(arrRoutes: RouteRecordRaw[]) {
  if (!arrRoutes || !arrRoutes.length) return;
  const modulesRoutesKeys = Object.keys(modulesRouts);

}

export {
  getHistoryMode,
  initRouter,
  ascending,
  filterTree,
  filterChildrenTree,
  filterNoPermissionTree,
  formatFlatteningRoutes,
  formatTwoStageRoutes,
  handleAliveRoute
};
