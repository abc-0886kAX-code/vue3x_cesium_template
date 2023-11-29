/*
 * @FilePath: \Furnace\src\internal\shared\constant.js
 * @Author: maggot-code
 * @Date: 2022-12-03 17:56:35
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-12-13 15:00:43
 * @Description: 
 */
export const SYSTEM_SYMBOL = Symbol("system");
export const MODE_SKIP_NAME = "fragment";
export const MODE_VOID_NAME = "void";
export const UNDEFINED_NAME = "unknow";
export const UNDEFINED_VIEW = defineAsyncComponent(() => import("@/components/EmptyView.vue"));
