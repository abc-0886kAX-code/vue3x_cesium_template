<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExamplePoint\ExamplePoint.vue
 * @Author: abc-0886kAX-code
 * @Date: 2023-11-29 10:05:54
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-03-25 15:54:48
 * @Description:
-->
<script setup>
import { CesiumFloatSymbolName } from '@/biz/Cesium/share/context';
import { usePopup } from "@/biz/Popup/usecase/usePopup";
import { useCesiumEvent } from '@/biz/Cesium/usecase/useCesiumEvent';
import { setupFloat } from './float.conf';

import { useResetCamera } from '@/biz/Cesium/usecase/useResetCamera.js';
import { PointPrimitiveCollection, BillboardCollection, LabelCollection } from 'cesium';
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import { usePrimitiveLayer } from '@/biz/Cesium/usecase/usePrimitiveLayer.js';
import PointJson from '@/assets/json/ExamplePoint.json';
import { usePoint } from '@/biz/Cesium/usecase/usePoint.js';

const roam = useResetCamera();
function splitArrayRandomly(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const part1 = array.splice(0, randomIndex);
    const part2 = array.splice(randomIndex + 1, randomIndex + 1 + Math.floor(Math.random()));
    return [part1, part2, array];
}
const [randomPart1, randomPart2, randomPart3] = splitArrayRandomly(PointJson.data);


const { setBaseShape, setIconShape, setLabel } = usePoint();
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
    config: {
        scene: unref(mapview).scene
    }
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


const labelController = setupLayer({
    render: LabelCollection,
    config: {
        scene: unref(mapview).scene
    }
});
const labelControllerEnity = unref(gather)[labelController._guid];
const labelEnity = labelControllerEnity.find();
function labelPointController() {
    labelControllerEnity.switch();
}

function addLabelPoint() {
    randomPart3.forEach((item, index) => {
        labelEnity.add(setLabel({
            longitude: item.lgtd,
            latitude: item.lttd,
            group: `测试${index}`
        }))
    })
}

onMounted(() => {
    roam();
    addBasePoint();
    addIconPoint();
    addLabelPoint()
})

onBeforeUnmount(() => {
    controllerEnity.clear();
    iconControllerEnity.clear();
    labelControllerEnity.clear();
})
</script>

<template>
    <div class="ExamplePoint">
        <div class="ExamplePoint-console">
            <div class="ExamplePoint-console-item">
                <div>基础点位-显示隐藏</div>
                <el-button type="primary" plain @click="pointController">切换</el-button>
            </div>
            <div class="ExamplePoint-console-item">
                <div>图标点位（贴地）-显示隐藏</div>
                <el-button type="primary" plain @click="iconPointController">切换</el-button>
            </div>
            <div class="ExamplePoint-console-item">
                <div>文本点位（贴地）-显示隐藏</div>
                <el-button type="primary" plain @click="labelPointController">切换</el-button>
            </div>
            <div class="ExamplePoint-console-item">
                <div>*图标+文本/基础+文本</div>
            </div>
        </div>
        <div class="ExamplePoint-illustrate">
            站点(点)示例
        </div>
    </div>
</template>

<style scoped lang='scss'>
.ExamplePoint {
    &-console {
        position: absolute;
        top: 5px;
        left: 150px;
        z-index: 999;
        background: #232323;
        height: 165px;
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
