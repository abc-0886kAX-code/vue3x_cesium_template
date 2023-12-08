/*
 * @FilePath: \vue3x_cesium_template\src\router\useRouter.js
 * @Author: zhangxin
 * @Date: 2022-11-30 10:18:11
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-08 11:21:22
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
                    "title": "Cesium示例-点",
                    "hidden": "true"
                },
                "component": () => import("@/pages/Example/ExamplePoint/ExamplePoint.vue")
            },
            {
                "path": "/Example/ExampleLine",
                "name": "ExampleLine",
                "meta": {
                    "title": "Cesium示例-线",
                    "hidden": "true"
                },
                "component": () => import("@/pages/Example/ExampleLine/ExampleLine.vue")
            },
            {
                "path": "/Example/ExampleZones",
                "name": "ExampleZones",
                "meta": {
                    "title": "Cesium示例-面",
                    "hidden": "true"
                },
                "component": () => import("@/pages/Example/ExampleZones/ExampleZones.vue")
            },
            {
                "path": "/Example/ExampleGeojson",
                "name": "ExampleGeojson",
                "meta": {
                    "title": "Cesium示例-Geojson",
                    "hidden": "true"
                },
                "component": () => import("@/pages/Example/ExampleGeojson/ExampleGeojson.vue")
            },
            {
                "path": "/Example/ExampleImages",
                "name": "ExampleImages",
                "meta": {
                    "title": "Cesium示例-图片",
                    "hidden": "true"
                },
                "component": () => import("@/pages/Example/ExampleImages/ExampleImages.vue")
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
