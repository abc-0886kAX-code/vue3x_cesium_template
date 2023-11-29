/*
 * @FilePath: \明湖大屏\src\hooks\useProgress.js
 * @Author: zhangxin
 * @Date: 2023-02-07 16:30:14
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-02-14 13:41:25
 * @Description:
 */
import { createEventHook } from "@vueuse/core";
import { transNumber } from "~/shared/trans";

export function useProgress(total, space) {
    const event = createEventHook();
    const timer = shallowRef(null);
    const index = ref(0);
    const cap = computed(() => unref(total) - 1);
    const unusable = computed(() => isNil(timer.value));
    const usable = computed(() => !unusable.value);
    // private
    function define() {
        if (unref(usable)) return;
        timer.value = setInterval(() => {
            if (index.value >= unref(cap)) {
                index.value = 0;
            } else {
                index.value++;
            }
        }, transNumber(space, 1000));
    }
    function clear() {
        if (unref(unusable)) return;
        clearInterval(timer.value);
        timer.value = null;
    }

    // public
    function start() {
        define();
    }
    function recess() {
        clear();
    }
    function stop() {
        index.value = unref(cap);
        clear();
    }

    watch(
        index,
        (idx) => {
            event.trigger(idx);
        },
        { immediate: true }
    );

    watch(
        cap,
        (value) => {
            if (cap - 1 < 0) return;
            index.value = value - 1;
        },
        { immediate: true }
    );

    onUnmounted(() => {
        event.off();
        stop();
    });

    return {
        cap,
        value: index,
        running: usable,
        run: event.on,
        start,
        recess,
        stop,
    };
}

export default useProgress;
