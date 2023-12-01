/*
 * @Author: zhangxin
 * @Date: 2022-04-26 15:11:22
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-01 16:50:57
 * @Description: file content
 */
import { uuid } from "@/shared/uuid";
import { PrimitiveCollection, PointPrimitiveCollection } from 'cesium';

export const handlerLayerConfig = (params, index) => {
    const { render, config } = params;
    return new render(config);
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
        const find = () => mapview.scene.primitives._primitives.find((item) => item._guid === layer._guid)
        const show = () => (find().show = true);
        const hide = () => (find().show = false);
        const clear = () => {
            const l = find();
            l.destroy();
        };

        handler(layer._guid, {
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
        const layer = handlerLayerConfig(conf);
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