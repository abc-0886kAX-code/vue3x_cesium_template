/*
 * @FilePath: \vue3x_cesium_template\src\hooks\useScroll.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-12-08 02:16:55
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-03-04 17:44:53
 * @Description:
 */
import { createEventHook } from "@vueuse/core";

import { useElementRefs } from "@/hooks/useElement";
import { transNumber } from "~/shared/trans";

export function useScroll() {
    const rollEvent = createEventHook();
    const { refs, ready } = useElementRefs();
    const scrollTopValue = computed(() => {
        if (!unref(ready)) return 0;
        return unref(refs).top;
    });
    const scrollLeftValue = computed(() => {
        if (!unref(ready)) return 0;
        return unref(refs).left;
    });
    const watchToxy = computed(() => {
        return { x: unref(scrollLeftValue), y: unref(scrollTopValue) };
    });
    function setupTop(value) {
        if (!unref(ready)) return;

        const top = transNumber(value, unref(scrollTopValue));
        unref(refs).scrollToY(top);
    }

    watchEffect(() => {
        if (!unref(ready)) return;
        rollEvent.trigger(unref(watchToxy));
    });

    onUnmounted(() => {
        rollEvent.off();
    });

    return {
        refs,
        scrollTopValue,
        setupTop,
        onRoll: rollEvent.on,
    };
}

export default useScroll;
