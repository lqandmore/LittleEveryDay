import { IconifyIcon } from "@iconify/vue";
import { FunctionalComponent } from "vue";
import {type RouteComponent, type RouteLocationNormalized } from "vue-router";

declare global {
  interface ToRouteType extends RouteLocationNormalized {
    meta: CustomizeRouteMeta;
  }

  interface CumstomizeRouteMeta {
    title: string;
    icon?: string | FunctionalComponent | IconifyIcon;
    extraIcon?: string | FunctionalComponent | IconifyIcon;
    showLink?: boolean;
    showParent?: boolean;
    roles?: string[];
    auths?: string[];
    keepAlive?: boolean;
    frameSrc?: string;
    frameLoading?: boolean;
    transition?: {
      name?: string;
      enterTransition?: string;
      leaveTransition?: string;
    };
    hiddenTag?: boolean;
    dynamicLevel?: number;
    activePath?: string;
  }

  interface RouteChildrenConfigsTable {
    path: string;
    name?: string;
    redirect?: string;
    component?: RouteComponent;
    meta?: CumstomizeRouteMeta;
    children?: RouteChildrenConfigsTable[];
  }

  interface RouteConfigsTable {
    path: string;
    name?: string;
    redirect?: string;
    component?: RouteComponent;
    meta?: {
      title: string;
      icon?: string | FunctionalComponent | IconifyIcon;
      showLink?: boolean;
      rank?: number;
    };
    children?: RouteChildrenConfigsTable[];
  }
}

declare module "vue-router" {
  interface RouteMeta extends CumstomizeRouteMeta {}
}
