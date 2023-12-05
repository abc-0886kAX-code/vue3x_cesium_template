/*
 * @FilePath: \vue3x_cesium_template\src\biz\Cesium\usecase\usePolygonGrid.js
 * @Author: zhangxin
 * @Date: 2022-05-19 11:02:21
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-05 09:35:39
 * @Description:
 */
import { Cartesian3, GeometryInstance, PolygonGeometry, PolylineMaterialAppearance, EllipsoidSurfaceAppearance, Material, PolygonHierarchy } from 'cesium';
import { convertColorRange } from "./usePoint";
import waterNormals from "@/assets/images/map/waterNormals.jpg";


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


export function usePolygonGrid(mapview) {
    function setupPolygonFillShape(options) {
        const { positions, color, attr } = options;
        return {
            geometryInstances: new GeometryInstance({
                geometry: new PolygonGeometry({
                    polygonHierarchy: new PolygonHierarchy(
                        Cartesian3.fromDegreesArray(positions)
                    ),
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

    function setupPolygonImageShape(options) {
        const { positions, style, attr } = options;
        return {
            geometryInstances: new GeometryInstance({
                geometry: new PolygonGeometry({
                    polygonHierarchy: new PolygonHierarchy(
                        Cartesian3.fromDegreesArray(positions)
                    ),
                }),
                id: attr ?? {}
            }),
            appearance: new EllipsoidSurfaceAppearance(style ?? waterStyle)
        }
    }


    return {
        setupPolygonFillShape,
        setupPolygonImageShape
    };
}
