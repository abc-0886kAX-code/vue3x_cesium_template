/*
 * @FilePath: \vue3x_cesium_template\src\router\useRouter.js
 * @Author: zhangxin
 * @Date: 2022-11-30 10:18:11
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-01 15:26:32
 * @Description:
 */
import { defineRouter } from "./defineRouter";
import { defineMeta } from "@/router/meta";
export const routes = [
    {
        name: "login",
        path: "/login",
        meta: defineMeta(),
        component: () => import("@/layout/login/login.vue"),
    },
    {
        name: "singleLogin",
        path: "/singleLogin",
        meta: defineMeta(),
        component: () => import("@/layout/loginsso/loginsso.vue"),
    },
    {
        name: "debug",
        path: "/debug",
        meta: defineMeta(),
        component: () => import("@/pages/Debug/debug.vue"),
    },
    {
        name: "layout",
        path: "/",
        redirect: "/Example/ExamplePoint",
        meta: defineMeta({ level: 0 }),
        component: () => import("@/layout/Home.vue"),
        children: [
            {
                "path": "/Example/ExamplePoint",
                "name": "ExamplePoint",
                "meta": {
                    "title": "点",
                    "hidden": "true"
                },
                "component": () => import("@/pages/Example/ExamplePoint.vue")
            },
            {
                "path": "/Example/ExampleLine",
                "name": "ExampleLine",
                "meta": {
                    "title": "线",
                    "hidden": "true"
                },
                "component": () => import("@/pages/Example/ExampleLine.vue")
            },
            {
                "path": "/Example/ExampleZones",
                "name": "ExampleZones",
                "meta": {
                    "title": "面",
                    "hidden": "true"
                },
                "component": () => import("@/pages/Example/ExampleZones.vue")
            }
        ]
    },
    {
        name: "404",
        path: "/404",
        meta: defineMeta({ title: "404" }),
        component: () => import("@/pages/NotPage/not-page.vue"),
    },
    {
        path: "/:catchAll(.*)", // 不识别的path自动匹配404
        redirect: '/404',
    },
];
const router = defineRouter(routes);

export function useRouter() {
    return router.core;
}

export function useRoute() {
    return router.core.currentRoute;
}

export const resetRoute = router.reset;

export default router;
