/*
 * @Author: maggot-code
 * @Date: 2022-05-27 17:05:27
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-16 23:51:49
 * @Description: file content
 */
import { layer, EventType } from "mars3d";

const { GeoJsonLayer } = layer;

const createForecastLayer = (options) => {
    return new GeoJsonLayer(Object.assign({}, options, { zIndex: 1001, flyTo: false }));
};

export function useRainForecastMap(mapview) {
    const rainForecastLayers = [];

    const layerToMapview = (layer, index) => {
        const show = index <= 0 ? true : false;
        mapview.addLayer(layer);
        mapview.getLayerById(layer.id).readyPromise.then(function (target) {
            target.setOptions({ show });
        });
        rainForecastLayers.push(layer);
        return layer;
    };

    const flytoForecastLayer = (layers) => {
        const [first] = layers;
        mapview.flyTo(first);
    };

    const clearForecastLayer = () => {
        rainForecastLayers.forEach((layer) => {
            layer.destroy(true);
            layer.remove(true);
        });
        rainForecastLayers.splice(0);
    };

    const setupForecastLayer = (datasource) => {
        clearForecastLayer();
        return datasource.map(createForecastLayer).map(layerToMapview);
    };

    const findForecastLayer = (raw) => {
        if (!mapview.hasLayer(raw?.id)) return;

        return mapview.getLayerById(raw.id);
    };

    return {
        layerToMapview,
        flytoForecastLayer,
        clearForecastLayer,
        setupForecastLayer,
        findForecastLayer,
    };
}
