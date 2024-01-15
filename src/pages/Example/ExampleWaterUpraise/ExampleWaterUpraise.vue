<script setup>
import { useResetCamera } from '@/biz/Cesium/usecase/useResetCamera.js';
import { PrimitiveCollection } from 'cesium';
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import { usePrimitiveLayer } from '@/biz/Cesium/usecase/usePrimitiveLayer.js';
import ZonesJson from './ExampleZones.json';
import { useDrawRiver } from "@/biz/Cesium/usecase/usePolygonGrid.js"
const roam = useResetCamera();
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

// 水体
let primitive = null;
// 定时器
let timer = null;
// 水体高度
let initialExtrudedHeight = -400;
// 距离地面目标高度
let targetHeight = 1000;
// 按钮禁用状态控制器
const state = ref(true);
// 按钮防连点
let counter = 0;

function waterUpraise() {
    if (counter > 0) return;
    counter++;
    timer = setInterval(() => {
        primitive.watch = {
            extrudedHeight: primitive.watch.extrudedHeight + 10,
            height: 10 + primitive.watch.height
        }

        // 如果动画完成，清除定时器
        if (primitive.watch.height >= targetHeight) {
            state.value = false;
            counter = 0;
            clearInterval(timer);
        }
    }, 50);
}
function waterDrop() {
    if (counter > 0) return;
    counter++;
    timer = setInterval(() => {
        primitive.watch = {
            extrudedHeight: primitive.watch.extrudedHeight - 10,
            height: primitive.watch.height - 10
        }

        // 如果动画完成，清除定时器
        if (primitive.watch.extrudedHeight === initialExtrudedHeight) {
            state.value = true;
            counter = 0;
            clearInterval(timer);
        }
    }, 50);
}


function executeQuery() {
    primitive = useDrawRiver(ZonesJson, initialExtrudedHeight, 0);
    enity.add(primitive)
}

onMounted(() => {
    roam({
        position: [116.666411, 40.429242, 9882],
    })
    executeQuery();
})

onBeforeUnmount(() => {
    controllerEnity.clear();
})
</script>

<template>
    <div class="ExampleWaterUpraise">
        <div class="ExampleWaterUpraise-console">
            <div class="ExampleWaterUpraise-console-item">
                <div>水体-显示隐藏</div>
                <el-button type="primary" plain @click="pointController">切换</el-button>
            </div>
            <div class="ExampleWaterUpraise-console-item">
                <div>水体-抬升</div>
                <el-button type="primary" plain :disabled="!state" @click="waterUpraise">抬升</el-button>
            </div>
            <div class="ExampleWaterUpraise-console-item">
                <div>水体-下降</div>
                <el-button type="primary" plain :disabled="state" @click="waterDrop">下降</el-button>
            </div>
        </div>
        <div class="ExampleWaterUpraise-illustrate">
            水体抬升示例
        </div>
    </div>
</template>

<style scoped lang='scss'>
.ExampleWaterUpraise {
    &-console {
        position: absolute;
        top: 5px;
        left: 150px;
        z-index: 999;
        background: #232323;
        height: 140px;
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
