<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExampleMask\ExampleMask.vue
 * @Author: zhangxin
 * @Date: 2023-11-29 10:05:54
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-29 09:51:30
 * @Description:
-->
<script setup>
import ExampleMask_BJ from '@/assets/json/ExampleMask_BJ.json';

import { initPlace } from '@/config/cesium.conf.js';
import { Cartesian3, GroundPrimitive, PrimitiveCollection, GroundPolylinePrimitive, Math } from 'cesium';
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import { usePolyline } from '@/biz/Cesium/usecase/usePolyline.js';
import { useMask } from "@/biz/Cesium/usecase/useMask.js"
import { usePrimitiveLayer } from '@/biz/Cesium/usecase/usePrimitiveLayer.js';

const { mapview } = useCesium();
const { setupMaskLayer } = useMask();
const { setupPolylineFillShape } = usePolyline()
const { gather, setupLayer } = usePrimitiveLayer(mapview);
const controller = setupLayer({
    render: PrimitiveCollection,
    config: {}
});
const controllerEnity = unref(gather)[controller._guid];
const enity = controllerEnity.find();

const maskLayer = computed(() => {
    return [
        enity.get(0),
        enity.get(1),
        enity.get(2),
    ]
})
const lineLayer = computed(() => enity.get(3))

function maskShowOrHide() {
    unref(maskLayer).forEach(layer => {
        layer.show = !layer.show;
    })
}
const slider = ref(0.5)
function maskTransparent(val) {
    unref(maskLayer).forEach(layer => {
        layer.appearance.material.uniforms.color.alpha = val
    })
    slider.value = val;
}
function lineShowOrHide() {
    unref(lineLayer).show = !unref(lineLayer).show;
}

function executeQuery() {
    const highlightArea = ExampleMask_BJ.map(item => {
        return [item.longitude, item.latitude]
    })

    const options = { attr: {}, positions: highlightArea.flat(2), enity }
    setupMaskLayer(options)

    const lineOptions = {
        positions: highlightArea.flat(2),
        width: 5,
    }
    enity.add(new GroundPolylinePrimitive(setupPolylineFillShape(lineOptions)))
}

onMounted(() => {
    unref(mapview).camera.flyTo({
        destination: Cartesian3.fromDegrees(...initPlace.position),
        orientation: {
            pitch: Math.toRadians(initPlace.pitch),
            heading: Math.toRadians(initPlace.heading),
        },
    });
    executeQuery();
})

onBeforeUnmount(() => {
    controllerEnity.clear();
})
</script>

<template>
    <div class="ExampleMask">
        <div class="ExampleMask-console">
            <div class="ExampleMask-console-item">
                <div>示例图层-显示隐藏
                </div>
                <el-button type="primary" plain @click="controllerEnity.switch">切换</el-button>
            </div>
            <div class="ExampleMask-console-item">
                <div>遮罩层-透明度
                </div>
                <el-slider class="slider" :model-value="slider" :min="0" :max="1" :step="0.1" @input="maskTransparent" />
            </div>
            <div class="ExampleMask-console-item">
                <div>遮罩层-显示隐藏
                </div>
                <el-button type="primary" plain @click="maskShowOrHide">切换</el-button>
            </div>
            <div class="ExampleMask-console-item">
                <div>边界线-显示隐藏
                </div>
                <el-button type="primary" plain @click="lineShowOrHide">切换</el-button>
            </div>
        </div>
        <div class="ExampleMask-illustrate">
            遮罩层示例
        </div>
    </div>
</template>

<style scoped lang='scss'>
.ExampleMask {
    &-console {
        position: absolute;
        top: 5px;
        left: 150px;
        z-index: 999;
        background: #232323;
        height: 185px;
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
}
</style>
