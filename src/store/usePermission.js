/*
 * @FilePath: \vue3x_template-master\src\store\usePermission.js
 * @Author: zhangxin
 * @Date: 2023-08-03 16:59:38
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-08-04 09:52:58
 * @Description: 待开发...
 */
import { defineStore } from 'pinia';
import { generator } from "@/router/generator"
export const Namespace = 'usePermission';

const paths = [""];

export const usePermission = defineStore(Namespace, {
    state: () => ({
        addRoutes: [],
        routes: []
    }),

    getters: {
        getAddRoutes(state) {
            return this.addRoutes;
        }
    },

    actions: {
        generateRoutes(routes) {
            return new Promise(resolve => {
                const accessedRoutes = generator(routes);
                this.addRoutes = accessedRoutes;
                resolve(accessedRoutes)
            })
        }
    },

    persist: {
        key: Namespace,
        paths,
    },
});

export function usePermissionStore() {
    return usePermission();
}

export default {
    namespace: Namespace,
    store: usePermission
};
