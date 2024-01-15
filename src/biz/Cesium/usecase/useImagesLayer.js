/*
 * @Author: abc-0886kAX-code
 * @Date: 2022-04-26 15:11:22
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-12-08 16:01:16
 * @Description: images图层
 */
export const handlerLayerConfig = (params, index) => {
    const { render, config } = params;
    return new render(config);
};
export const addLayer = (layer, mapview) => {
    if (mapview.imageryLayers.contains(layer)) return;
    return mapview.imageryLayers.addImageryProvider(layer);
};


function eachGather(gather, handler) {
    Reflect.ownKeys(gather).forEach((key) => handler(gather[key], key));
}

function handlerGather(layers, mapview, handler) {
    layers.forEach((layer) => {

        const find = () => unref(mapview).imageryLayers.get(unref(mapview).imageryLayers.indexOf(layer))
        const show = () => (find().show = true);
        const hide = () => (find().show = false);
        const clear = () => {
            const l = find();
            unref(mapview).imageryLayers.remove(l, true)
        };

        handler(unref(mapview).imageryLayers.indexOf(layer), {
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

// 这个存储器没有多大意义，本来是想抛出方法动态修改url的,结果url是只读属性
export function useImagesLayer(mapview) {
    const layers = unref(mapview).imageryLayers._layers;
    const gather = shallowRef({});

    const setupGather = (name, layer) => {
        gather.value[name] = layer;
    };
    const setupLayer = (conf) => {
        const layer = handlerLayerConfig(conf);
        const result = addLayer(layer, unref(mapview));
        handlerGather([result], unref(mapview), setupGather);
        return result;
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
