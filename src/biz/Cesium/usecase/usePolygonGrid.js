/*
 * @Author: maggot-code
 * @Date: 2022-05-23 20:27:04
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-07-15 16:08:52
 * @Description: file content
 */
const setupColor = ({ color }) => `rgba(${color.join(",")})`;

function setupShapeSymbol(attr) {
    return {
        color: setupColor(attr),
    };
}
function setupPolygonGridShape(result) {
    const { color: colorAll, features } = result;
    const [defaultColor] = colorAll;

    return {
        data: features,
        // flyTo: true,
        symbol: {
            styleOptions: {
                clampToGround: true,
                fill: true, // 是否填充
                color: setupColor({ color: defaultColor }), // 颜色
                // opacity: 1.0 // 透明度
            },
            callback: setupShapeSymbol,
        },
    };
}

export function usePolygonGrid(mapview) {
    // setupShape
    // setupLegend

    return {
        setupShape: setupPolygonGridShape,
    };
}
