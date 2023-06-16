import Cookies from "js-cookie";
import { storageSession } from "@pureadmin/utils";
import { useUserStore } from "store/modules/user";

export interface DataInfo<T> {
  accessToken: string;
  expires: T;
  refreshToken: string;
  username?: string;
  roles?: string[];
}

export const sessionKey = "user-info";
export const TokenKey = "authorized-token";

export function getToken(): string {
  return Cookies.get(TokenKey)
    ? JSON.parse(Cookies.get(TokenKey)!)
    : storageSession().getItem(sessionKey);
}

export function setToken(data: DataInfo<Date>): void {
  let expires = 0;
  const { accessToken, refreshToken } = data;
  expires = new Date(data.expires).getTime();
  const cookieString = JSON.stringify({ accessToken, expires });
  expires > 0
    ? Cookies.set(TokenKey, cookieString, {
        expires: (expires - Date.now()) / 1000 / 60 / 60 / 24
      })
    : Cookies.set(TokenKey, cookieString);
  function setSessionKey(username: string, roles: string[]) {
    useUserStore().SET_USERNAME(username);
    useUserStore().SET_ROLES(roles);
    storageSession().setItem(sessionKey, {refreshToken, expires, username, roles });
  }
  if (data.username && data.roles) {
    setSessionKey(data.username, data.roles);
  }else {
   const username = storageSession().getItem<DataInfo<string>>(sessionKey).username ?? "";
   const roles = storageSession().getItem<DataInfo<string[]>>(sessionKey).roles ?? [];
    setSessionKey(username, roles);
  }
}

export function removeToken(): void {
  Cookies.remove(TokenKey);
  sessionStorage.clear();
}

export const formatToken = (token: string): string => {
  return 'Bearer ' + token;
};
