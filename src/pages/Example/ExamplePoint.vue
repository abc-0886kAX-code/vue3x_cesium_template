<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExamplePoint.vue
 * @Author: zhangxin
 * @Date: 2023-11-29 10:05:54
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-01 17:47:04
 * @Description:
-->
<script setup>
import { Cartesian3, Color, PointPrimitiveCollection } from 'cesium';
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import { usePrimitiveLayer } from '@/biz/Cesium/usecase/usePrimitiveLayer.js';

const { mapview } = useCesium();
const { gather, setupLayer } = usePrimitiveLayer(mapview);
const controller = setupLayer({
    render: PointPrimitiveCollection,
    config: {}
});
const controllerEnity = unref(gather)[controller._guid];
const enity = controllerEnity.find();

function pointController() {
    controllerEnity.switch();
}

function executeQuery() {
    for (var longitude = -180; longitude < 180; longitude++) {
        var color = Color.PINK;
        if ((longitude % 2) === 0) {
            color = Color.CYAN;
        }
        for (var latitude = -90; latitude < 90; latitude++) {
            enity.add({
                position: Cartesian3.fromDegrees(longitude, latitude, 1000),
                color: color,
            });
        }
    }
}

onMounted(() => {
    unref(mapview).camera.flyTo({
        destination: Cartesian3.fromDegrees(116.416411, 40.249242, 409882)
    });
    executeQuery();
})
</script>

<template>
    <div class="ExamplePoint">
        <el-button type="primary" plain @click="pointController" size="small">点位显隐</el-button>
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
