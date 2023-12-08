/*
 * @Author: zhangxin
 * @Date: 2022-04-26 17:47:31
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-08 10:12:55
 * @Description: 点渲染方法
 */

import { Cartesian3, Color, VerticalOrigin } from 'cesium';
import defaultPoint from '@/assets/images/map/point_icon.png'

// rgba 0-255转0-1范围
// [255, 255, 255, 255] => [1, 1, 1, 1]
export function convertColorRange(color) {
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
