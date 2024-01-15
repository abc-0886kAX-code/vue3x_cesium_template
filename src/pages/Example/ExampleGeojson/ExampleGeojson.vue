<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExampleGeojson\ExampleGeojson.vue
 * @Author: abc-0886kAX-code
 * @Date: 2023-11-29 10:05:54
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-01-15 16:20:39
 * @Description:
-->
<script setup>
import { useResetCamera } from '@/biz/Cesium/usecase/useResetCamera.js';
import { GroundPrimitive, PrimitiveCollection } from 'cesium';
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import { usePrimitiveLayer } from '@/biz/Cesium/usecase/usePrimitiveLayer.js';
import GeoJson from '@/assets/json/ExampleGeoJson.json';
import { usePolygonGrid } from "@/biz/Cesium/usecase/usePolygonGrid.js"

const roam = useResetCamera();
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
    GeoJson.data.features.forEach(({ geometry, properties }) => {

        const positions = geometry.coordinates.flat(2);
        const options = { positions, color: properties.color }
        enity.add(new GroundPrimitive(setupPolygonFillShape(options)))
    })
}

onMounted(() => {
    roam();
    executeQuery();
})

onBeforeUnmount(() => {
    controllerEnity.clear();
})
</script>

<template>
    <div class="ExampleGeojson">
        <div class="ExampleGeojson-console">
            <div class="ExampleGeojson-console-item">
                <div>风险等级图-显示隐藏</div>
                <el-button type="primary" plain @click="pointController">切换</el-button>
            </div>
        </div>

        <div class="ExampleGeojson-illustrate">
            GeoJson数据格式渲染
        </div>

    </div>
</template>

<style scoped lang='scss'>
.ExampleGeojson {
    &-console {
        position: absolute;
        top: 5px;
        left: 150px;
        z-index: 999;
        background: #232323;
        height: 50px;
        width: 300px;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 10px;

        &-item {
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px;
            box-sizing: border-box;
        }
    }

    &-illustrate {
        position: absolute;
        top: 5px;
        left: 40%;
        z-index: 999;
        background: #232323;
        height: 30px;
        width: 400px;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 10px;
        color: #fff;
        text-align: center;
    }
}
</style>
