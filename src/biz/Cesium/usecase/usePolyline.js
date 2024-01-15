/*
 * @FilePath: \vue3x_cesium_template\src\biz\Cesium\usecase\usePolyline.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-05-19 11:02:21
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-12-05 09:37:10
 * @Description: 线段渲染方法
 */
import { Cartesian3, GeometryInstance, GroundPolylineGeometry, PolylineMaterialAppearance, EllipsoidSurfaceAppearance, Material } from 'cesium';
import { convertColorRange } from "./usePoint";
import waterNormals from "@/assets/images/map/line-tarans.png";


const waterStyle = {
    aboveGround: true,
    material: new Material({
        fabric: {
            type: 'Water',
            uniforms: {
                normalMap: waterNormals,
                frequency: 8000.0, // 控制波数的数字。
                animationSpeed: 0.02, // 控制水的动画速度的数字。
                amplitude: 5.0, // 控制水波振幅的数字。
                specularIntensity: 0.8, // 控制镜面反射强度的数字。
            }
        }
    }),
}


export function usePolyline(mapview) {
    function setupPolylineFillShape(options) {
        const { width, positions, color, attr } = options;
        return {
            geometryInstances: new GeometryInstance({
                geometry: new GroundPolylineGeometry({
                    positions: Cartesian3.fromDegreesArray(positions),
                    width: width ?? 4.0,
                }),
                id: attr ?? {}
            }),
            appearance: new PolylineMaterialAppearance({
                material: Material.fromType("Color", {
                    color: color ? convertColorRange(color) : convertColorRange([0, 255, 255, 255, 1]),
                }),
            })
        }
    }

    function setupPolylineImageShape(options) {
        const { width, positions, style, attr } = options;
        return {
            geometryInstances: new GeometryInstance({
                geometry: new GroundPolylineGeometry({
                    positions: Cartesian3.fromDegreesArray(positions),
                    width: width ?? 4.0,
                }),
                id: attr ?? {}
            }),
            appearance: new PolylineMaterialAppearance(style ?? waterStyle),
        }
    }


    return {
        setupPolylineFillShape,
        setupPolylineImageShape
    };
}
