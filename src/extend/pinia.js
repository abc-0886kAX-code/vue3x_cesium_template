/*
 * @FilePath: \vue3x_cesium_template\src\extend\pinia.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-11-21 14:54:26
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-11-16 16:11:09
 * @Description:
 */
import { createPinia, PiniaVuePlugin } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

export const pinia = createPinia();

pinia.use(createPersistedState({
    debug: import.meta.env.DEV,
    storage: sessionStorage
}));

export function extendPinia(Vue) {
    Vue.use(pinia);

    return pinia;
}

export default extendPinia;
