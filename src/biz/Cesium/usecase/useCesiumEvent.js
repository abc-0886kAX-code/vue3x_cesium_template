/*
 * @Author: abc-0886kAX-code
 * @Date: 2022-04-28 16:51:12
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-12-07 14:12:26
 * @Description: file content
 */
import { uuid } from "@/shared/uuid.js";

import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import { ScreenSpaceEventHandler, defined, ScreenSpaceEventType } from 'cesium';



export function useCesiumEvent(events) {
    const layerKey = ref();
    const { mapview } = useCesium();
    const handler = new ScreenSpaceEventHandler(unref(mapview).scene.canvas);

    handler.setInputAction((e) => {
        if (!events['click']) return;
        const pick = unref(mapview).scene.pick(e.position);
        if (defined(pick)) {
            events['click'](pick);
        }
    }, ScreenSpaceEventType.LEFT_CLICK);

    let triggerOut = false;
    handler.setInputAction((e) => {
        const pick = unref(mapview).scene.pick(e.endPosition);
        if (defined(pick) && events['mouseOver']) {
            triggerOut = true;
            unref(mapview)._container.style.cursor = "pointer";
            // 鼠标移入
            events['mouseOver']({ ...pick, endPosition: e.endPosition });
        }

        if (triggerOut && !defined(pick) && events['mouseOut']) {
            unref(mapview)._container.style.cursor = "default";
            // 鼠标移出
            events['mouseOut'](pick);
            triggerOut = false;
        }
    }, ScreenSpaceEventType.MOUSE_MOVE);

    const setupBind = (layer) => {
        layerKey.value = layer._guid ?? uuid();
    };

    onUnmounted(() => {
        handler && handler.destroy();
    })

    return {
        setupBind,
    };
}
