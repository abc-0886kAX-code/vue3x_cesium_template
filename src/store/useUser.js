/*
 * @FilePath: \vue3x_cesium_template-master\src\store\useUser.js
 * @Author: abc-0886kAX-code
 * @Date: 2023-02-07 15:09:09
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-08-04 10:15:22
 * @Description:
 */
import { defineStore } from "pinia";
import { isEmptyString } from "~/shared/is";
import { uuid } from "@/shared/uuid.js";


const paths = ["token"];

export const Namespace = "useUser";

export const useUser = defineStore(Namespace, {
    state: () => ({
        token: uuid(),
    }),

    getters: {
        tokenUnusable() {
            return isEmptyString(this.token);
        },
        tokenUsable() {
            return !this.tokenUnusable;
        },
    },

    actions: {
        setupToken(token) {
            this.token = token;
        },
        emptyUserInfo() {
            this.token = "";
        },
    },

    persist: {
        key: Namespace,
        paths,
    },
});

export function useUserStore() {
    return useUser();
}

export default {
    namespace: Namespace,
    store: useUser,
};
