/*
 * @Author: zhangxin
 * @Date: 2022-05-17 00:37:12
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-17 17:07:40
 * @Description: file content
 */
import { LngLatPoint, Cesium } from "mars3d";

const { HeightReference } = Cesium;

export function setupModelShape(options) {
    const { longitude, latitude, color, url, heading } = options;

    const position = new LngLatPoint(longitude, latitude);

    const highlight = {
        color: "#FFFF33",
    };

    const style = {
        heightReference: HeightReference.CLAMP_TO_GROUND,
        clampToGround: true,
        url,
        color: color ?? "#FF0033",
        fill: true,
        scale: 0.1,
        heading: heading ?? 0,
        pitch: 0,
        roll: 0,
        minimumPixelSize: 50,
        maximumScale: 500,
        highlight,
    };

    return {
        position,
        style,
    };
}

export function useModel(mapview) {
    return {};
}
