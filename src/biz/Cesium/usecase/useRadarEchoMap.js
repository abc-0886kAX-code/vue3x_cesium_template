/*
 * @Author: maggot-code
 * @Date: 2022-05-25 14:58:07
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-09 17:41:30
 * @Description: file content
 */
import { Cesium, layer } from "mars3d";
const { Resource } = Cesium;
const { ImageLayer } = layer;

const IMGSERVER = '/uploadFiles';


const createRadarLayer = ({ id, time, src }) => {
    return new ImageLayer({
        id,
        name: "radar",
        url: `${IMGSERVER}/${src}`,
        opacity: 0,
        rectangle: {
            xmin: 113.34406,
            ymin: 35.9589,
            xmax: 119.93586,
            ymax: 42.74581,
        }
    });
}

export function useRadarEchoMap(mapview) {
    const radarEchoLayers = [];

    const layerToMapview = (layer) => {
        // mapview.addLayer(layer);
        layer.addTo(mapview);
        radarEchoLayers.push(layer);
        return layer;
    }

    const flytoRadarLayer = (layers) => {
        const [first] = layers;
        first.flyTo({ scale: 1.2 });
    }

    const clearRadarLayer = () => {
        radarEchoLayers.forEach(layer => {
            layer.destroy(true);
            layer.remove(true);
        });
        radarEchoLayers.splice(0);
    }

    const setupRadarLayer = (datasource) => {
        clearRadarLayer();
        const layers = datasource.map(createRadarLayer).map(layerToMapview);
        return layers;
    }

    const findRadarLayer = (raw) => {
        if (!mapview.hasLayer(raw?.id)) return;

        return mapview.getLayerById(raw.id);
    }

    return {
        layerToMapview,
        flytoRadarLayer,
        clearRadarLayer,
        setupRadarLayer,
        findRadarLayer
    }
}