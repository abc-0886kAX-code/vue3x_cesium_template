/*
 * @FilePath: \明湖数字大厅\src\biz\Mars3D\usecase\useTilesetLayer.js
 * @Author: zhangxin
 * @Date: 2022-11-24 14:25:37
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-11-24 14:30:31
 * @Description:
 */
import { layer } from "mars3d";
const { TilesetLayer } = layer;


export function useTilesetLayer(mapview, options) {
    const { name, position, url } = options;
    const tilesetLayer = new TilesetLayer({
        name: name,
        url,
        position,
        maximumScreenSpaceError: 5,
        maximumMemoryUsage: 3078,
        dynamicScreenSpaceError: true,
        cullWithChildrenBounds: false,
        skipLevelOfDetail: true,
        preferLeaves: true,
        center: position,

        flyTo: false,
    })

    mapview.addLayer(tilesetLayer);
    return {}
}
