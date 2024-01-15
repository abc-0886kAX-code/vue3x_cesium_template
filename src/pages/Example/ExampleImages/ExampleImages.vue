<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExampleImages\ExampleImages.vue
 * @Author: abc-0886kAX-code
 * @Date: 2023-11-29 10:05:54
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-01-15 17:46:47
 * @Description:
-->
<script setup>
import { useResetCamera } from '@/biz/Cesium/usecase/useResetCamera.js';
import { SingleTileImageryProvider, Rectangle, } from 'cesium';
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import { useImagesLayer } from '@/biz/Cesium/usecase/useImagesLayer.js';
import radarImage from '@/assets/images/map/radar.png';
import ImagesJson from '@/assets/json/ExampleImages.json';

const roam = useResetCamera();
const { mapview } = useCesium();
const { gather, setupLayer } = useImagesLayer(mapview);
const controller = ref({
    alpha: 1
})

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
            url: radarImage,
            tileWidth: 200, // 必须 -文档出错
            tileHeight: 200, // 必须 文档出错
            rectangle: Rectangle.fromDegrees(113.34406, 35.9589, 119.93586, 42.74581)
        }
    });
}

onMounted(() => {
    roam();
    executeQuery();
})

onBeforeUnmount(() => {
    unref(controllerEnity).clear();
})
</script>

<template>
    <div class="ExampleImages">
        <div class="ExampleImages-console">
            <div class="ExampleImages-console-item">
                <div>显示隐藏</div>
                <el-button type="primary" plain @click="pointController">切换</el-button>
            </div>
            <div class="ExampleImages-console-item">
                <div>透明度</div>
                <el-slider class="slider" v-model="controller.alpha" :min="0" :max="1" :step="0.1" />
            </div>
        </div>
        <div class="ExampleImages-illustrate">
            雷达气象图(图片)渲染
        </div>


    </div>
</template>

<style scoped lang='scss'>
.ExampleImages {
    &-console {
        position: absolute;
        top: 5px;
        left: 150px;
        z-index: 999;
        background: #232323;
        height: 95px;
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

.slider {
    width: 150px;
    padding: 5px;
    box-sizing: border-box;
}
</style>
