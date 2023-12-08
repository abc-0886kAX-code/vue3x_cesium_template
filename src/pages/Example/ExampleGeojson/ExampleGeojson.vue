<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExampleGeojson\ExampleGeojson.vue
 * @Author: zhangxin
 * @Date: 2023-11-29 10:05:54
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-08 09:36:08
 * @Description:
-->
<script setup>
import { Cartesian3, GroundPrimitive, PrimitiveCollection } from 'cesium';
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import { usePrimitiveLayer } from '@/biz/Cesium/usecase/usePrimitiveLayer.js';
import GeoJson from '@/assets/json/ExampleGeoJson.json';
import { usePolygonGrid } from "@/biz/Cesium/usecase/usePolygonGrid.js"
const { setupPolygonFillShape } = usePolygonGrid();
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
    GeoJson.data.features.forEach(({ geometry,properties }) => {

        const positions = geometry.coordinates.flat(2);
        const options = { positions,color:properties.color }
        enity.add(new GroundPrimitive(setupPolygonFillShape(options)))
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
