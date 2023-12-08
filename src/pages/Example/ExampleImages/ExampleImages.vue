<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExampleImages\ExampleImages.vue
 * @Author: zhangxin
 * @Date: 2023-11-29 10:05:54
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-08 16:04:51
 * @Description:
-->
<script setup>
import { Cartesian3, SingleTileImageryProvider, Rectangle } from 'cesium';
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import { useImagesLayer } from '@/biz/Cesium/usecase/useImagesLayer.js';
import transparentImage from '@/assets/images/map/transparent.png';
import ImagesJson from '@/assets/json/ExampleImages.json';
const { mapview } = useCesium();
const { gather, setupLayer } = useImagesLayer(mapview);
const controller = ref()

const controllerEnity = computed(() => {
    return unref(gather)[unref(controller)._layerIndex];
})

function pointController() {
    unref(controllerEnity).switch();
}

async function executeQuery() {
    controller.value = setupLayer({
        render: SingleTileImageryProvider,
        config: {
            url: transparentImage,
            tileWidth: 200, // 必须 -文档出错
            tileHeight: 200, // 必须 文档出错
            rectangle: Rectangle.fromDegrees(113.34406, 35.9589, 119.93586, 42.74581)
        }
    });
}

onMounted(() => {
    unref(mapview).camera.flyTo({
        destination: Cartesian3.fromDegrees(116.416411, 40.249242, 409882)
    });
    executeQuery();
})

onBeforeUnmount(() => {
    unref(controllerEnity).clear();
})
</script>

<template>
    <div class="ExampleImages">
        <el-button type="primary" plain @click="pointController">显隐</el-button>
    </div>
</template>

<style scoped lang='scss'>
.ExampleImages {
    position: absolute;
    top: 5px;
    left: 150px;
    z-index: 999;
}
</style>
