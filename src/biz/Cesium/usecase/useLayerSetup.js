/*
 * @Author: zhangxin
 * @Date: 2022-04-26 15:34:17
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-11-29 14:14:07
 * @Description: file content
 */
const { VITE_ROOT_LAYERID } = import.meta.env;

const handlerLayerPid = () => +VITE_ROOT_LAYERID;
const handlerLayerId = (pid, index) => pid + index + 1;
export const handlerLayerConfig = (conf, index) => {
    const pid = handlerLayerPid();

    return Object.assign(
        {},
        {
            show: true,
            id: handlerLayerId(pid, index),
            pid,
        },
        conf
    );
};
export const addLayer = (layer, mapview) => {
    if (mapview.hasLayer(layer.id)) return;
    mapview.addLayer(layer);
};

export function useLayerSetup(props, mapview) {
    const layerGroup = computed(() => {
        return [
            // {
            //     type: "osmBuildings",
            //     name: "osmBuildingsLayer",
            // },
            ...props.layers,
        ];
    });

    const layers = unref(layerGroup).map(handlerLayerConfig);

    onMounted(() => {
        layers.forEach((layer) => addLayer(layer, unref(mapview.view)));
    });
}
