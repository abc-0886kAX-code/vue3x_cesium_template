/*
 * @Author: zhangxin
 * @Date: 2022-05-20 16:08:49
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-22 15:54:04
 * @Description: file content
 */
import { Cesium, LngLatPoint } from "mars3d";
import { setupShapeLabel } from "./usePoint";

const { HorizontalOrigin, VerticalOrigin } = Cesium;

export function setupBillboardShape(options) {
    const { longitude, latitude, text, image } = options;

    const position = new LngLatPoint(longitude, latitude);

    const highlight = {
        scale: 0.5,
    };

    const style = {
        image,
        visibleDepth: false,
        clampToGround: true,
        scale: 0.4,
        horizontalOrigin: HorizontalOrigin.CENTER,
        verticalOrigin: VerticalOrigin.BOTTOM,
        highlight,
    };

    if (text) style.label = setupShapeLabel(options);

    return {
        position,
        style,
    };
}

export function useBillboard(mapview) {
    return {};
}
