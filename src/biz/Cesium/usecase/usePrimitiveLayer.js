/*
 * @Author: zhangxin
 * @Date: 2022-04-26 15:11:22
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-01 14:31:58
 * @Description: file content
 */
import { uuid } from "@/shared/uuid";
import { Primitive } from 'cesium';
const { VITE_ROOT_LAYERID } = import.meta.env;

const handlerLayerPid = () => +VITE_ROOT_LAYERID;
const handlerLayerId = (pid, index) => pid + index + 1;
export const handlerLayerConfig = (conf, index) => {
    const pid = handlerLayerPid();

    return new Primitive(Object.assign(
        {},
        {
            show: true,
            id: handlerLayerId(pid, index),
            pid,
        },
        conf
    ));
};
export const addLayer = (layer, mapview) => {
    if (mapview.scene.primitives.contains(layer)) return;
    mapview.scene.primitives.add(layer);
};


function eachGather(gather, handler) {
    Reflect.ownKeys(gather).forEach((key) => handler(gather[key], key));
}

function handlerGather(layers, mapview, handler) {
    layers.forEach((layer) => {
        const find = () => unref(mapview).scene.primitives._primitives.find((item) => item.id === layer.id);
        const show = () => (find().show = true);
        const hide = () => (find().show = false);
        const clear = () => {
            const l = find();
            l.destroy();
        };

        handler(layer.name, {
            id: layer.id,
            find,
            show,
            hide,
            clear,
            switch: () => (find().show = !find().show),
        });
    });
}

function releaseGather(layer) {
    layer.destroy();
}

export function usePrimitiveLayer(mapview) {
    const layers = unref(mapview).scene.primitives._primitives;
    const gather = shallowRef({});

    const setupGather = (name, layer) => {
        gather.value[name] = layer;
    };
    const setupLayer = (conf) => {
        const id = uuid();
        const layer = handlerLayerConfig({ ...conf, id });
        addLayer(layer, unref(mapview));
        handlerGather([layer], unref(mapview), setupGather);
        return layer;
    };
    const destroyLayer = () => {
        eachGather(unref(gather), releaseGather);
    };

    handlerGather(layers, unref(mapview), setupGather);

    return {
        gather,
        setupLayer,
        destroyLayer,
    };
}
