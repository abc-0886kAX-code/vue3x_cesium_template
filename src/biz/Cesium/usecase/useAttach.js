/*
 * @Author: zhangxin
 * @Date: 2022-04-25 10:46:15
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-11-22 14:48:56
 * @Description: file content
 */

export function useAttach(mapview, mapbox) {
    const mapviewRef = shallowRef(null);

    mapviewRef.value = mapview;

    watch(
        () => mapviewRef.value,
        (v, old, onInvalidate) => {
            if (v & !v.proof(old._id)) {
                old.uninstall();
                nextTick(() => v.install(mapbox.value));
                onInvalidate(() => v.uninstall());
            }
        }
    );

    onMounted(() => {
        mapview.install(mapbox.value);
    });

    onUnmounted(() => {
        mapview.uninstall();
    });

    return mapviewRef;
}
