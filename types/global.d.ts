import { type RouteLocationNormalized } from "vue-router";

declare global {
  /**
   * `src/router` 文件夹里的类型声明
   */
  interface toRouteType extends RouteLocationNormalized {
    meta: {
      roles: Array<string>;
      keepAlive?: boolean;
      dynamicLevel?: string;
    };
  }
}

declare let myName = "LI"
