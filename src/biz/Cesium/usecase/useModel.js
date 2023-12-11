/*
 * @Author: zhangxin
 * @Date: 2022-05-17 00:37:12
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-11 16:53:01
 * @Description: file content
 */
import { Cesium3DTileset } from "cesium";

export function useModel() {
    async function setupModelShape(options) {
        const { url, ..._params } = options;
        const tileset = await Cesium3DTileset.fromUrl(url, _params);
        return tileset;
    }


    return {
        setupModelShape
    };
}
