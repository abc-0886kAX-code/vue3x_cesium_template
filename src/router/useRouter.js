/*
 * @FilePath: \vue3x_cesium_template\src\router\useRouter.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-11-30 10:18:11
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-03-12 15:08:05
 * @Description:
 */
import { defineRouter } from "./defineRouter";
import { defineMeta } from "@/router/meta";
export const routes = [
    {
        name: "login",
        path: "/login",
        meta: defineMeta(),
        component: () => import("@/layout/Login/Login.vue"),
    },
    {
        name: "singleLogin",
        path: "/singleLogin",
        meta: defineMeta(),
        component: () => import("@/layout/Loginsso/Loginsso.vue"),
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
        component: () => import("@/layout/ExampleHome.vue"),
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
            },
            {
                "path": "/Example/ExampleMask",
                "name": "ExampleMask",
                "meta": {
                    "title": "Cesium示例-遮罩层",
                    "hidden": "true"
                },
                "component": () => import("@/pages/Example/ExampleMask/ExampleMask.vue")
            },
            {
                "path": "/Example/ExampleModel",
                "name": "ExampleModel",
                "meta": {
                    "title": "Cesium示例-模型",
                    "hidden": "true"
                },
                "component": () => import("@/pages/Example/ExampleModel/ExampleModel.vue")
            },
            {
                "path": "/Example/ExampleTilesetModel",
                "name": "ExampleTilesetModel",
                "meta": {
                    "title": "Cesium示例-供水厂模型",
                    "hidden": "true"
                },
                "component": () => import("@/pages/Example/ExampleTilesetModel/ExampleTilesetModel.vue")
            },
            {
                "path": "/Example/ExampleWaterUpraise",
                "name": "ExampleWaterUpraise",
                "meta": {
                    "title": "Cesium示例-水体抬升",
                    "hidden": "true"
                },
                "component": () => import("@/pages/Example/ExampleWaterUpraise/ExampleWaterUpraise.vue")
            },
            {
                "path": "/Example/ExampleRoam",
                "name": "ExampleRoam",
                "meta": {
                    "title": "Cesium示例-漫游",
                    "hidden": "true"
                },
                "component": () => import("@/pages/Example/ExampleRoam/ExampleRoam.vue")
            },
            {
                "path": "/Example/ExampleWeather",
                "name": "ExampleWeather",
                "meta": {
                    "title": "Cesium示例-天气",
                    "hidden": "true"
                },
                "component": () => import("@/pages/Example/ExampleWeather/ExampleWeather.vue")
            },
            {
                "path": "/Example/ExampleCuttingMap",
                "name": "ExampleCuttingMap",
                "meta": {
                    "title": "Cesium示例-地图裁剪",
                    "hidden": "true"
                },
                "component": () => import("@/pages/Example/ExampleCuttingMap/ExampleCuttingMap.vue")
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
