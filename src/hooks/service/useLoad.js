/*
 * @FilePath: /vue3x_cesium_template/src/hooks/service/useLoad.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-12-04 01:37:53
 * @LastEditors: abc-0886kAX-code
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

