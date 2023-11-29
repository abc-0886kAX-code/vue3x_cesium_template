/*
 * @FilePath: \3D防汛作战\src\biz\Mars3D\usecase\usePolyline.js
 * @Author: zhangxin
 * @Date: 2022-05-19 11:02:21
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-22 11:42:10
 * @Description:
 */
import { Cesium, MaterialUtil, MaterialType } from "mars3d";

export function setupPolylineFillShape(options = {}) {
    const { color } = options;

    const highlight = {
        color: color ?? "rgba(30, 226, 242,1.0)",
        alpha: 1.0,
    };

    const style = {
        width: 12,
        clampToGround: true,
        color: color ?? "rgba(30, 226, 242,0.8)",
        alpha: 0.8,
        highlight,
    };

    return style;
}

export function setupLineFlowColorShape(options = {}) {
    const { color, colorActive } = options;

    const highlight = {
        material: MaterialUtil.createMaterialProperty(MaterialType.LineFlowColor, {
            color: colorActive,
            speed: 24,
            percent: 0.15,
            alpha: 0.8,
        }),
    };

    const style = {
        width: 6,
        clampToGround: true,
        material: MaterialUtil.createMaterialProperty(MaterialType.LineFlowColor, {
            color,
            speed: 18,
            percent: 0.15,
            alpha: 0.6,
        }),
        highlight,
    };

    return style;
}

export function setupPolylineImageShape(options = {}) {
    const { color, colorActive, image } = options;

    const highlight = {
        material: MaterialUtil.createMaterialProperty(MaterialType.LineFlow, {
            color: colorActive ?? color ?? "rgba(30, 226, 242,1.0)",
            speed: 7,
            alpha: 1.0,
            image,
        }),
    };

    const style = {
        width: 8,
        clampToGround: true,
        material: MaterialUtil.createMaterialProperty(MaterialType.LineFlow, {
            color: color ?? "rgba(30, 226, 242,0.8)",
            speed: 3,
            alpha: 1.0,
            image,
        }),
        highlight,
    };

    return style;
}

export function setupWallLineShape(options = {}) {
    const { color, colorActive, image } = options;

    const highlight = {
        material: MaterialUtil.createMaterialProperty(MaterialType.LineFlow, {
            image,
            color: colorActive,
            repeat: new Cesium.Cartesian2(20, 1),
            speed: 24,
        }),
    };

    const style = {
        diffHeight: 400,
        material: MaterialUtil.createMaterialProperty(MaterialType.LineFlow, {
            image,
            color,
            repeat: new Cesium.Cartesian2(20, 1),
            speed: 12,
        }),
        highlight,
    };

    return style;
}

export function usePolyline(mapview) {
    return {};
}
