<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExamplePoint\ExamplePoint.vue
 * @Author: zhangxin
 * @Date: 2023-11-29 10:05:54
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-08 16:34:39
 * @Description:
-->
<script setup>
import { CesiumFloatSymbolName } from '@/biz/Cesium/share/context';
import { usePopup } from "@/biz/Popup/usecase/usePopup";
import { useCesiumEvent } from '@/biz/Cesium/usecase/useCesiumEvent';
import { setupFloat } from './float.conf';

import { Cartesian3, PointPrimitiveCollection, BillboardCollection } from 'cesium';
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import { usePrimitiveLayer } from '@/biz/Cesium/usecase/usePrimitiveLayer.js';
import PointJson from '@/assets/json/ExamplePoint.json';
import { usePoint } from '@/biz/Cesium/usecase/usePoint.js';


function splitArrayRandomly(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const part1 = array.splice(0, randomIndex);
    return [part1, array];
}
const [randomPart1, randomPart2] = splitArrayRandomly(PointJson.data);


const { setBaseShape, setIconShape } = usePoint();
const { mapview } = useCesium();
const { gather, setupLayer } = usePrimitiveLayer(mapview);

const controller = setupLayer({
    render: PointPrimitiveCollection,
    config: {}
});
const controllerEnity = unref(gather)[controller._guid];
const enity = controllerEnity.find();

const popup = usePopup();
const dialog = popup.define({
    width: "50%",
    // template: WaterLevel,
});
const { setupFloatHide, setupFloatWindow } = inject(CesiumFloatSymbolName);
function handlerClick(target) {
    if (!target?.id) return;
    const { id: attr } = target;
    const { stnm: title } = attr;

    setupFloatHide();
    dialog.setupTitle(title);
    dialog.show(attr);
}

function handlerOver(target) {
    if (!target?.id) return;
    const { id: attr, endPosition } = target;
    setupFloatWindow({
        content: setupFloat(attr),
        ...endPosition,
    });
}

useCesiumEvent({
    click: handlerClick,
    mouseOver: handlerOver,
    mouseOut: setupFloatHide,
});
function pointController() {
    controllerEnity.switch();
}
function addBasePoint() {
    randomPart1.forEach((item) => {
        enity.add(Object.assign(setBaseShape({
            longitude: item.lgtd,
            latitude: item.lttd
        }), {
            id: item
        }))
    })
}


const iconController = setupLayer({
    render: BillboardCollection,
    config: {}
});
const iconControllerEnity = unref(gather)[iconController._guid];
const iconEnity = iconControllerEnity.find();
function iconPointController() {
    iconControllerEnity.switch();
}
function addIconPoint() {
    randomPart2.forEach((item) => {
        iconEnity.add(setIconShape({
            longitude: item.lgtd,
            latitude: item.lttd
        }))
    })
}

onMounted(() => {
    unref(mapview).camera.flyTo({
        destination: Cartesian3.fromDegrees(116.416411, 40.249242, 409882)
    });
    addBasePoint();
    addIconPoint();
})

onBeforeUnmount(() => {
    controllerEnity.clear();
    iconControllerEnity.clear();
})
</script>

<template>
    <div class="ExamplePoint">
        <div class="ExamplePoint-item">
            <div>基础点位-显示隐藏</div>
            <el-button type="primary" plain @click="pointController">切换</el-button>
        </div>
        <div class="ExamplePoint-item">
            <div>图标点位-显示隐藏</div>
            <el-button type="primary" plain @click="iconPointController">切换</el-button>
        </div>
    </div>
</template>

<style scoped lang='scss'>
.ExamplePoint {
    position: absolute;
    top: 5px;
    left: 150px;
    z-index: 999;
    background: #232323;
    height: 100px;
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
</style>
