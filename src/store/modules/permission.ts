import { defineStore } from "pinia";
import { store } from "@/store";
import { type cacheType } from "./types";
import { ascending, filterTree, filterNoPermissionTree } from "@/router/utils";
import { getKeyList } from "@pureadmin/utils";
import { useMultiTagsStoreHook } from "./multiTags";

export const usePermissionStore = defineStore({
  id: "pure-permission",
  state: () => ({
    constantMenus,
    wholeMenus: [],
    cachePageList: []
  }),
  actions: {
    handleWholeMenus(routes: any) {
      this.wholeMenus = filterNoPermissionTree(
        filterTree(ascending(this.constantMenus.concat(routes)))
      );
    },
    cacheOperate({ mode, name }: cacheType) {
      const delIndex = this.cachePageList.findIndex(v => v === name);
      switch (mode) {
        case "refresh":
          this.cachePageList = this.cachePageList.filter(v => v !== name);
          break;
        case "add":
          this.cachePageList.push(name);
          break;
        case "delete":
          delIndex !== -1 && this.cachePageList.splice(delIndex, 1);
          break;
      }
      (() => {
        let cacheLength = this.cachePageList.length;
        const nameList = getKeyList(useMultiTagsStoreHook().multiTags, "name");
        while (cacheLength > 0) {
          nameList.findIndex(v => v === this.cachePageList[cacheLength - 1]) ===
            -1 &&
            this.cachePageList.splice(
              this.cachePageList.indexOf(this.cachePageList[cacheLength - 1], 1)
            );
          cacheLength--;
        }
      })();
    },
    clearAllCachePage() {
      this.wholeMenus = [];
      this.cachePageList = [];
    }
  }
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
