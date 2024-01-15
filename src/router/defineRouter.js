/*
 * @FilePath: \vue3x_cesium_template\src\router\defineRouter.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-11-03 09:41:56
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-11-16 16:09:58
 * @Description:
 */
import { createRouter, createWebHashHistory } from 'vue-router'


export function setupRouter(routes) {
    return createRouter({
        history: createWebHashHistory('/'),
        scrollBehavior: () => ({ left: 0, top: 0 }),
        mode: "hash",
        routes: Array.isArray(routes) ? routes : []
    })
}

export function defineRouter(routes) {
    const core = setupRouter(routes);

    function reset() {
        const router = setupRouter(routes);
        core.matcher = router.matcher;
    }
    function use(Vue) {
        Vue.use(core);
    }

    return {
        core,
        reset,
        use
    }
}

export default defineRouter;
