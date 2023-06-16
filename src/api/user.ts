import { http } from "@/utils/http";

export type UserResult = {
  success: boolean;
  data: {
    /* 用户名 */
    username: string;
    /* 当前登录用户的角色 */
    roles: string[];
    /* token */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    expires: Date;
  };
};

export const getLogin = (data?: object) => {
  return http<UserResult>({
    url: "/login",
    method: "post",
    data
  });
};

export const getRefreshToken = (data?: object) => {
  return http<RefreshTokenResult>({
    url: "/refreshToken",
    method: "post",
    data
  });
};
