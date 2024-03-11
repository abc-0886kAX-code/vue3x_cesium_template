/*
 * @FilePath: \vue3x_cesium_template\src\biz\Cesium\usecase\usePolygonGrid.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-05-19 11:02:21
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-03-06 14:18:51
 * @Description: 面渲染方法
 */
import { Primitive, Cartesian3, GeometryInstance, PolygonGeometry, PolylineMaterialAppearance, EllipsoidSurfaceAppearance, Material, PolygonHierarchy, Color } from 'cesium';
import { convertColorRange } from "./usePoint";
import waterNormals from "@/assets/images/map/waterNormals.jpg";


const WaterUpraiseStyle = {
    aboveGround: true,
    material: new Material({
        fabric: {
            type: 'Water',
            uniforms: {
                baseWaterColor: new Color(64 / 255.0, 157 / 255.0, 253 / 255.0, 0.5), // 水的基本颜色
                normalMap: waterNormals,
                frequency: 500.0, // 水波纹的数量
                animationSpeed: 0.05, // 水的流速
                amplitude: 5, // 水波纹振幅
                specularIntensity: 5, // 镜面反射强度
            }
        },
    }),
}


const waterStyle = {
    aboveGround: true,
    material: new Material({
        fabric: {
            type: 'Water',
            uniforms: {
                baseWaterColor: new Color(64 / 255.0, 157 / 255.0, 253 / 255.0, 0.5),
                normalMap: waterNormals,
                frequency: 200.0, // 控制波数的数字。
                animationSpeed: 0.01, // 控制水的动画速度的数字。
                amplitude: 10.0, // 控制水波振幅的数字。
                specularIntensity: 1, // 控制镜面反射强度的数字。
            }
        },
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
        const { positions, style, attr, extrudedHeight, height } = options;
        return {
            geometryInstances: new GeometryInstance({
                geometry: new PolygonGeometry({
                    polygonHierarchy: new PolygonHierarchy(
                        Cartesian3.fromDegreesArray(positions)
                    ),
                    extrudedHeight,
                    height,
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




/**
 *  水体绘制/抬升/下降
 * @param boundary 边界点位 [112.23, 22.25, 112.24, 22.24]
 * @param extrudedHeight 水面高度
 * @param height 距离地面高度
 * @returns 水面实例
 */
export function useDrawRiver(boundary, extrudedHeight = 0, height = 0) {
    let riverHeight = extrudedHeight
    let groundHeight = height
    const polygon = useCreatePolygonGeometry(boundary, riverHeight, groundHeight)
    let river = null;
    river = new Primitive({
        geometryInstances: new GeometryInstance({
            geometry: polygon,
        }),
        appearance: new EllipsoidSurfaceAppearance(WaterUpraiseStyle),
        show: true,
        asynchronous: false,
        releaseGeometryInstances: false,
    })

    Object.defineProperty(river, 'watch', {
        get() {
            return {
                height: groundHeight,
                extrudedHeight: riverHeight
            }
        },
        set(newVal) {
            if (typeof newVal !== 'object') {
                return
            }
            groundHeight = newVal.height
            riverHeight = newVal.extrudedHeight
            river._state = 3 // 重置primitive状态触发cesium update方法
            river._appearance = undefined
            river.geometryInstances.geometry = useCreatePolygonGeometry(boundary, riverHeight, groundHeight)
        },
    })
    return river
}
function useCreatePolygonGeometry(boundary, extrudedHeight, height) {
    const polygon = new PolygonGeometry({
        polygonHierarchy: new PolygonHierarchy(Cartesian3.fromDegreesArray(boundary)),
        extrudedHeight,
        height,
        // closeTop: false,
        // closeBottom: false
    })
    return polygon
}
