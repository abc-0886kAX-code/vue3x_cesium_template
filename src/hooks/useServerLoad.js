/*
 * @FilePath: \Furnace\src\hooks\useServerLoad.js
 * @Author: zhangxin
 * @Date: 2022-11-22 14:01:06
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-11-22 14:04:31
 * @Description: 
 */
import { toArray } from "@/shared/trans";

function pickLoading(server) {
    return unref(server).loading;
}

export function useServerLoad(servers) {
    const loads = toArray(servers).map(pickLoading);

    return computed(() => loads.some((load) => unref(load)));
}

export default useServerLoad;
