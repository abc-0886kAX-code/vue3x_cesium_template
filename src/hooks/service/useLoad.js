/*
 * @FilePath: /Furnace/src/hooks/service/useLoad.js
 * @Author: maggot-code
 * @Date: 2022-12-04 01:37:53
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-12-04 22:32:46
 * @Description: 
 */
import { transArray } from "~/shared/trans";

function pickLoading(server) {
    return unref(server).server?.loading;
}

export function useLoad(servers) {
    const loads = transArray(servers).map(pickLoading);
    return computed(() => {
        return loads.some((load) => !!unref(load));
    });
}

export default useLoad;

