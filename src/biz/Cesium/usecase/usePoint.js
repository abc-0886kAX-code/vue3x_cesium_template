/*
 * @Author: zhangxin
 * @Date: 2022-04-26 17:47:31
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-04 14:11:08
 * @Description: file content
 */

import { Cartesian3, Color, VerticalOrigin } from 'cesium';
import defaultPoint from '@/assets/images/map/point_icon.png'
// import { LngLatPoint, Cesium } from "mars3d";

// const { NearFarScalar } = Cesium;

// const handlerText = (cell) => {
//     const [value, label] = cell;
//     if (cell.length <= 1) return value;

//     return `${label}：${value}`;
// };
// export function createLabel(textSchema) {
//     return textSchema.map(handlerText).join(`\n`);
// }

// export function setupShapeLabel(options) {
//     const { text, textColor, textBgColor, useBgColor, offsetx, offsety } = options;

//     return {
//         text,
//         clampToGround: true,
//         visibleDepth: false,
//         scale: 1.0,
//         font_size: 12,
//         color: textColor ?? "#FF0033",
//         backgroundColor: textBgColor ?? "#DCDFE6",
//         background: useBgColor ?? true,
//         backgroundOpacity: textColor ? 1.0 : 0.8,
//         backgroundPadding: 6,

//         // scaleByDistance: true,
//         // scaleByDistance_far: 1000,
//         // scaleByDistance_farValue: 1.0,
//         // scaleByDistance_near: 1000000,
//         // scaleByDistance_nearValue: 1.2,

//         hasPixelOffset: true,
//         pixelOffsetX: offsetx ?? 0,
//         pixelOffsetY: offsety ?? -18,
//     };
// }

// export function setupPointShape(options) {
//     const { longitude, latitude, text, color } = options;

//     const position = new LngLatPoint(longitude, latitude);

//     const highlight = {
//         outlineWidth: 2,
//     };

//     const style = {
//         visibleDepth: false,
//         clampToGround: true,
//         pixelSize: 14,
//         color: color ?? "#FF0033",
//         outlineColor: "#FFFF33",
//         outlineWidth: 0,
//         outlineOpacity: 1.0,
//         scaleByDistance: new NearFarScalar(1000, 0.8, 1000000, 1.2),
//         highlight,
//     };

//     if (text) style.label = setupShapeLabel(options);

//     return {
//         position,
//         style,
//     };
// }

// rgba 0-255转0-1范围
// [255, 255, 255, 255] => [1, 1, 1, 1]
function convertColorRange(color) {
    const [r, g, b, a] = color;
    return new Color(r / 255, g / 255, b / 255, a)
}


export function usePoint() {
    function setBaseShape(options) {
        const { longitude, latitude, text, color, distance } = options;
        const position = Cartesian3.fromDegrees(longitude, latitude, distance ?? 1000)


        const style = {
            pixelSize: 14,
            color: color ? convertColorRange(color) : convertColorRange([255, 0, 51, 1]),
            outlineColor: convertColorRange([255, 255, 51, 1]),
            outlineWidth: 0,
        }

        return {
            position,
            ...style,
        }
    }
    function setIconShape(options) {
        const { longitude, latitude, text, image, distance } = options;
        const position = Cartesian3.fromDegrees(longitude, latitude, distance ?? 1000)


        const style = {
            scale: 0.4,
            position: position,
            image: image ?? defaultPoint,
            verticalOrigin: VerticalOrigin.BOTTOM,
        }

        return {
            position,
            ...style,
        }
    }


    return {
        setBaseShape,
        setIconShape
    };
}
