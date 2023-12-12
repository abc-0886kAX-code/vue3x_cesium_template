<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExampleHuaiRouModel\ExampleHuaiRouModel.vue
 * @Author: zhangxin
 * @Date: 2023-11-29 10:05:54
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-12 14:15:13
 * @Description:
-->
<script setup>
import { Cartesian3, PrimitiveCollection, Transforms, defined, ClassificationType, Matrix4, Cartographic } from 'cesium';
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import { usePrimitiveLayer } from '@/biz/Cesium/usecase/usePrimitiveLayer.js';
import { useModel } from '@/biz/Cesium/usecase/useModel.js';

const { setupModelById, setupModelByUrl } = useModel();
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

async function executeQuery() {
    const tile = await setupModelById({
        id: '2387456',
        maximumScreenSpaceError: 16,
        cacheBytes: 1073741824,
        maximumCacheOverflowBytes: 2147483648,
        show: true,
        skipLevelOfDetail: true,
        baseScreenSpaceError: 1024,
        skipScreenSpaceErrorFactor: 16,
        skipLevels: 1,
        immediatelyLoadDesiredLevelOfDetail: false,
        loadSiblings: false,
    })
    enity.add(tile);
    unref(mapview).zoomTo(tile)
}

onMounted(() => {
    // unref(mapview).camera.flyTo({
    //     destination: Cartesian3.fromDegrees(116.416411, 40.249242, 1000)
    // });
    executeQuery();
})
onBeforeUnmount(() => {
    controllerEnity.clear();
})
</script>

<template>
    <div class="ExampleModel">
        <div class="ExampleModel-console">
            <div class="ExampleModel-console-item">
                <div>怀柔模型-显示隐藏
                </div>
                <el-button type="primary" plain @click="pointController">切换</el-button>
            </div>
        </div>
        <div class="ExampleModel-illustrate">
            怀柔模型(存在问题-还没有锁定问题)
        </div>
    </div>
</template>

<style scoped lang='scss'>
.ExampleModel {
    &-console {
        position: absolute;
        top: 5px;
        left: 150px;
        z-index: 999;
        background: #232323;
        height: 55px;
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
