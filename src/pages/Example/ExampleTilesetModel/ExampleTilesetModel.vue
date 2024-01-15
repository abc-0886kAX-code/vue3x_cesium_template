<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExampleTilesetModel\ExampleTilesetModel.vue
 * @Author: abc-0886kAX-code
 * @Date: 2023-11-29 10:05:54
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-12-29 10:25:17
 * @Description:
-->
<script setup>
import { Cartesian3, PrimitiveCollection, Transforms, defined, ClassificationType, Matrix4, Cartographic } from 'cesium';
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import { usePrimitiveLayer } from '@/biz/Cesium/usecase/usePrimitiveLayer.js';
import { useModel, update3dtilesMaxtrix } from '@/biz/Cesium/usecase/useModel.js';

const { setupModelByUrl } = useModel();
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
    const tile = await setupModelByUrl({
        url: "model/factory/tileset.json",
        // url: 'https://data.mars3d.cn/3dtiles/max-piping/tileset.json'
    });
    enity.add(tile);
    tile._root.transform = update3dtilesMaxtrix({
        tx: 116.442159, //模型中心X轴坐标（经度，单位：十进制度）
        ty: 39.742936, //模型中心Y轴坐标（纬度，单位：十进制度）
        tz: 0, //模型中心Z轴坐标（高程，单位：米）
        rx: 0, //X轴（经度）方向旋转角度（单位：度）
        ry: 0, //Y轴（纬度）方向旋转角度（单位：度）
        rz: 60, //Z轴（高程）方向旋转角度（单位：度）
    });

    unref(mapview).zoomTo(tile)
}

onMounted(() => {
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
                <div>供水厂模型-显示隐藏
                </div>
                <el-button type="primary" plain @click="pointController">切换</el-button>
            </div>
        </div>
        <div class="ExampleModel-illustrate">
            供水厂模型
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
