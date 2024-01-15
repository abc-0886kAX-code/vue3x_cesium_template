/*
 * @FilePath: \vue3x_cesium_template\src\router\meta.js
 * @Author: abc-0886kAX-code
 * @Date: 2023-01-30 15:25:13
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-01-30 15:42:55
 * @Description:
 */
import { transObject } from "~/shared/trans";
import { mergeObject } from "~/shared/merge";

export const NormMeta = {
    level: -1,
    title: "",
    navname: "",
    // 用于区分业务逻辑表示的层级关系
    // 部分路由虽然level相同，但是在业务逻辑上会区分主次来放置在不同的UI中
    navstate: {
        main: false,
        second: false,
    },
};

export function defineMeta(extend) {
    return mergeObject(NormMeta, transObject(extend));
}
