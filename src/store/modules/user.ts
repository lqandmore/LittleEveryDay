
import { defineStore } from "pinia"
import { userType } from "./types"
import { storageSession } from "@pureadmin/utils"
import {type DataInfo,sessionKey,setToken } from "utils/auth"
import { UserResult, getLogin } from "@/api/user"
import { store } from "@/store"

export const useUserStore = defineStore({
  id: "user",
  state: () : userType => ({
    username: storageSession().getItem<DataInfo<number>>(sessionKey).username ?? "",
    roles: storageSession().getItem<DataInfo<string[]>>(sessionKey).roles ?? [],
    verifyCode: "",
    currentPage: 0,
  }),
  actions: {
    SET_USERNAME(username: string) {
      this.username = username
    },
    SET_ROLES(roles: string[]) {
      this.roles = roles
    },
    SET_VERIFYCODE(verifyCode: string) {
      this.verifyCode = verifyCode
    },
    SET_CURRENTPAGE(currentPage: number) {
      this.currentPage = currentPage
    },

    async loginByUserName(data: any) {
      return new Promise<UserResult>((resolve, reject) => {
        getLogin(data).then((res: any) => {
          if (res) {
            setToken(res.data)
            resolve(res)
          }
        }).catch((err: any) => {
          reject(err)
        })
      })
    }

  }
})

export function useUserStoreHook() {
  return useUserStore(store)
}

