/*
 * @Author: zhangxin
 * @Date: 2022-05-17 15:57:43
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-22 11:45:29
 * @Description: file content
 */
export function setupWaterShape(options) {
    const { normalMap, color, colorActive } = options;

    const highlight = {
        frequency: 800.0, // 控制波数的数字。
        animationSpeed: 0.02, // 控制水的动画速度的数字。
        amplitude: 3.0, // 控制水波振幅的数字。
        specularIntensity: 0.8, // 控制镜面反射强度的数字。
        opacity: 0.9,
        baseWaterColor: colorActive ?? color ?? "rgba(30, 226, 242,0.5)",
    };

    const style = {
        normalMap,
        frequency: 600.0, // 控制波数的数字。
        animationSpeed: 0.01, // 控制水的动画速度的数字。
        amplitude: 2.0, // 控制水波振幅的数字。
        specularIntensity: 0.6, // 控制镜面反射强度的数字。
        baseWaterColor: color ?? "rgba(30, 226, 242,0.5)",
        blendColor: color ?? "rgba(30, 226, 242,0.5)",
        opacity: 0.8, // 透明度
        clampToGround: true, // 是否贴地
        highlight,
    };

    return style;
}

export function useWater(mapview) {
    return {};
}
