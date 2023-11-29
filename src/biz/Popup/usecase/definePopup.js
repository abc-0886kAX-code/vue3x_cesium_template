/*
 * @FilePath: \明湖数字大厅\src\biz\Popup\usecase\definePopup.js
 * @Author: maggot-code
 * @Date: 2022-12-05 14:10:19
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-03-04 20:19:05
 * @Description:
 */
import { POPUP_SYMBOLE } from "../shared/context";
import { useShallowObject } from "@/hooks/ref/useShallowObject";

function providePopup(wrap) {
    provide(POPUP_SYMBOLE, wrap);
    return wrap;
}

export function definePopup() {
    const record = ref(0);
    const cache = useShallowObject();
    const pond = computed(() => {
        return Object.keys(unref(cache.source));
    });
    const pondFind = computed(() => {
        return (key) => cache.take(key);
    });
    function pondRelease(key) {
        return (done) => {
            if (!cache.has(key)) return;

            const entity = cache.take(key);
            isFunction(done) && done();
            entity.state.toDisable();
            // cache.remove(key);
        };
    }
    function toRecord() {
        record.value++;
        return unref(record);
    }
    function toPond(entity) {
        const { uid } = entity;
        cache.bind(uid, entity);
    }

    onUnmounted(() => {
        cache.clear();
    });
    return providePopup({
        cache,
        pond,
        pondFind,
        pondRelease,
        toRecord,
        toPond,
    });
}

export default definePopup;
