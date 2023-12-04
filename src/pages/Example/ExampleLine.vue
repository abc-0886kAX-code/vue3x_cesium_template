<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExampleLine.vue
 * @Author: zhangxin
 * @Date: 2023-11-29 10:05:54
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-04 11:14:17
 * @Description:
-->
<script setup>
import { Cartesian3, GroundPolylinePrimitive, PrimitiveCollection, GeometryInstance, GroundPolylineGeometry, PolylineMaterialAppearance, Material, Color } from 'cesium';
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import { usePrimitiveLayer } from '@/biz/Cesium/usecase/usePrimitiveLayer.js';
import LineJson from '@/assets/json/ExampleLine.json';

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
    LineJson.features.forEach(({ geometry }) => {
        enity.add(new GroundPolylinePrimitive({
            geometryInstances: new GeometryInstance({
                geometry: new GroundPolylineGeometry({
                    positions: Cartesian3.fromDegreesArray(geometry.paths[0].flat(2)),
                    width: 5.0,
                }),
            }),
            appearance: new PolylineMaterialAppearance({
                material: Material.fromType("Color", {
                    color: new Color(1.0, 1.0, 0.0, 1.0),
                }),
            })
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
        <el-button type="primary" plain @click="pointController" size="small">线段显隐</el-button>
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
