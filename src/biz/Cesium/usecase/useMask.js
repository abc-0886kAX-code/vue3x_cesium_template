/*
 * @FilePath: \vue3x_cesium_template\src\biz\Cesium\usecase\useMask.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-06-21 10:08:49
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-12-11 15:29:21
 * @Description:
 */
import { Cartesian3, GeometryInstance, PolygonGeometry, PolylineMaterialAppearance, Material, PolygonHierarchy, GroundPrimitive } from 'cesium';
import { convertColorRange } from "./usePoint";

// 通过三个面构建一个遮罩层 - 不能使用180
const GlobalMap = [
    [0, 0, 0, 90, 179, 90, 179, 0], // 上半面
    [0, 0, 0, -90, 179, -90, 179, 0], // 下半面
    [-179, 90, -179, -90, 0, -90, 0, 90] // 背面
]

export function useMask() {
    function setupMaskLayer(options) {
        const { positions, color, attr, enity } = options;
        const empty = new PolygonHierarchy(
            Cartesian3.fromDegreesArray(positions)
        )
        // 不能使用循环，会出现重叠问题
        enity.add(new GroundPrimitive({
            geometryInstances: new GeometryInstance({
                geometry: new PolygonGeometry({
                    polygonHierarchy: new PolygonHierarchy(
                        Cartesian3.fromDegreesArray(GlobalMap[0]), [empty]
                    ),
                }),
                id: attr ?? {}
            }),
            appearance: new PolylineMaterialAppearance({
                material: Material.fromType("Color", {
                    color: color ? convertColorRange(color) : convertColorRange([2, 26, 79, 0.5]),
                }),
            })
        }))

        enity.add(new GroundPrimitive({
            geometryInstances: new GeometryInstance({
                geometry: new PolygonGeometry({
                    polygonHierarchy: new PolygonHierarchy(
                        Cartesian3.fromDegreesArray(GlobalMap[1])
                    ),
                }),
                id: attr ?? {}
            }),
            appearance: new PolylineMaterialAppearance({
                material: Material.fromType("Color", {
                    color: color ? convertColorRange(color) : convertColorRange([2, 26, 79, 0.5]),
                }),
            })
        }))


        enity.add(new GroundPrimitive({
            geometryInstances: new GeometryInstance({
                geometry: new PolygonGeometry({
                    polygonHierarchy: new PolygonHierarchy(
                        Cartesian3.fromDegreesArray(GlobalMap[2])
                    ),
                }),
                id: attr ?? {}
            }),
            appearance: new PolylineMaterialAppearance({
                material: Material.fromType("Color", {
                    color: color ? convertColorRange(color) : convertColorRange([2, 26, 79, 0.5]),
                }),
            })
        }))
    }

    return {
        setupMaskLayer
    }
}
