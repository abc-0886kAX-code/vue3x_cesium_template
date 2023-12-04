<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExampleZones.vue
 * @Author: zhangxin
 * @Date: 2023-11-29 10:05:54
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-04 11:14:06
 * @Description:
-->
<script setup>
import { Cartesian3, GroundPrimitive, PrimitiveCollection, GeometryInstance, PolygonGeometry, PolygonHierarchy, MaterialAppearance, Material, Color } from 'cesium';
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import { usePrimitiveLayer } from '@/biz/Cesium/usecase/usePrimitiveLayer.js';
import ZonesJson from '@/assets/json/ExampleZones.json';

const { mapview } = useCesium();
const { gather, setupLayer } = usePrimitiveLayer(mapview);
const controller = setupLayer({
    render: PrimitiveCollection,
    config: {}
});
const controllerEnity = unref(gather)[controller._guid];
const enity = controllerEnity.find();

function pointController() {
    controllerEnity.switch();
}

function executeQuery() {
    ZonesJson.features.forEach(({ geometry }) => {
        enity.add(new GroundPrimitive({
            geometryInstances: new GeometryInstance({
                geometry: new PolygonGeometry({
                    polygonHierarchy: new PolygonHierarchy(
                        Cartesian3.fromDegreesArray(geometry.rings.flat(2))
                    ),
                }),
            }),
            appearance: new MaterialAppearance({
                material: Material.fromType("Color", {
                    color: new Color(0, 1, 1, 1),
                }),
                faceForward: true,
            }),
        }))
    })
}

onMounted(() => {
    unref(mapview).camera.flyTo({
        destination: Cartesian3.fromDegrees(116.416411, 40.249242, 409882)
    });
    executeQuery();
})

onBeforeUnmount(() => {
    controllerEnity.clear();
})
</script>

<template>
    <div class="ExamplePoint">
        <el-button type="primary" plain @click="pointController" size="small">面显隐</el-button>
    </div>
</template>

<style scoped lang='scss'>
.ExamplePoint {
    position: absolute;
    top: 5px;
    left: 120px;
    z-index: 999;
}
</style>
