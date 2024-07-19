/*
 * @FilePath: \前端\src\biz\Cesium\usecase\useWatchLevel.js
 * @Author: zhangxin
 * @Date: 2024-07-19 13:05:05
 * @LastEditors: zhangxin
 * @LastEditTime: 2024-07-19 14:28:15
 * @Description:
 */
import { useCesium } from "@/biz/Cesium/usecase/useCesium.js";
import { createEventHook } from "@vueuse/core";

export function useWatchLevel() {
    const event = createEventHook();

    const { mapview } = useCesium();

    let removeListener;

    function startWatchLevel() {
        removeListener = unref(mapview).camera.changed.addEventListener(() => {
            event.trigger(getzoom());
        })
    }

    function endWatchLevel() {
        if (removeListener) {
            removeListener();
        }
    }



    function getzoom() {
        var tilesToRender = unref(mapview).scene.globe._surface._tilesToRender
        var level
        if (tilesToRender.length != 0) {
            level = tilesToRender[0].level
        }
        return level
    }
    onUnmounted(() => {
        event.off();
        endWatchLevel();
    });
    return {
        startWatchLevel,
        onMapLevel: event.on
    }
};
export default useWatchLevel;
