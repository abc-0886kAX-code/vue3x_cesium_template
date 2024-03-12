/*
 * @FilePath: \vue3x_cesium_template\src\biz\Cesium\usecase\useCuttingMap.js
 * @Author: zhangxin
 * @Date: 2024-03-12 14:43:03
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-03-12 15:19:12
 * @Description: 参照示例 https://sandcastle.cesium.com/?src=Terrain%2520Clipping%2520Planes.html
 */
import { Matrix4, Color, Cartesian3, ClippingPlane, ClippingPlaneCollection, Transforms, HeadingPitchRange, BoundingSphere, Cartographic } from 'cesium';

export function useCuttingMap(mapview) {
    function executeCutting(options) {
        const { center, distance } = options;
        const position = Cartographic.toCartesian(
            new Cartographic.fromDegrees(...center)
        );
        const boundingSphere = new BoundingSphere(position, distance);
        mapview.scene.globe.clippingPlanes = new ClippingPlaneCollection({
            modelMatrix: Transforms.eastNorthUpToFixedFrame(position),
            planes: [
                new ClippingPlane(
                    new Cartesian3(1.0, 0.0, 0.0),
                    distance
                ),
                new ClippingPlane(
                    new Cartesian3(-1.0, 0.0, 0.0),
                    distance
                ),
                new ClippingPlane(
                    new Cartesian3(0.0, 1.0, 0.0),
                    distance
                ),
                new ClippingPlane(
                    new Cartesian3(0.0, -1.0, 0.0),
                    distance
                ),
            ],
            unionClippingRegions: true, // 如果为 true，则如果某个区域位于集合中任何平面的外部，则该区域将被剪裁。否则，只有当某个区域位于每个平面的外部时，才会被剪裁。
            edgeWidth: 1.0, //应用于剪裁对象的边缘的高光的宽度（以像素为单位）。
            edgeColor: Color.WHITE, //用于突出显示对象被剪裁的边缘所应用的颜色。
            enabled: true, // 确定修剪平面是否处于活动状态。
        });

        mapview.scene.globe.backFaceCulling = false;
        mapview.scene.globe.showSkirts = false;
        mapview.camera.viewBoundingSphere(
            boundingSphere,
            new HeadingPitchRange(0.5, -0.5, boundingSphere.radius * 5.0)
        );
        mapview.camera.lookAtTransform(Matrix4.IDENTITY); // 必须，不然鼠标操作会被改变
    }

    return {
        executeCutting
    }
};
export default useCuttingMap;
