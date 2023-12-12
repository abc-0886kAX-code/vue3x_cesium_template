/*
 * @Author: zhangxin
 * @Date: 2022-05-17 00:37:12
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-12 13:44:29
 * @Description: file content
 */
import { Cesium3DTileset } from "cesium";

export function useModel() {
    async function setupModelByUrl(options) {
        const { url, ..._params } = options;
        console.log(url, _params);
        const tileset = await Cesium3DTileset.fromUrl(url, _params);
        return tileset;
    }
    async function setupModelById(options) {
        const { id, ..._params } = options;
        const tileset = await Cesium3DTileset.fromIonAssetId(id, _params);
        return tileset;
    }


    return {
        setupModelByUrl,
        setupModelById,
    };
}
