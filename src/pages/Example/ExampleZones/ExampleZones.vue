<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExampleZones\ExampleZones.vue
 * @Author: zhangxin
 * @Date: 2023-11-29 10:05:54
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-08 09:39:58
 * @Description:
-->
<script setup>
import { initPlace } from '@/config/cesium.conf.js';
import { CesiumFloatSymbolName } from '@/biz/Cesium/share/context';
import { usePopup } from "@/biz/Popup/usecase/usePopup";
import { useCesiumEvent } from '@/biz/Cesium/usecase/useCesiumEvent';
import { setupFloat } from './float.conf';

import { Cartesian3, GroundPrimitive, PrimitiveCollection, Math } from 'cesium';
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import { usePrimitiveLayer } from '@/biz/Cesium/usecase/usePrimitiveLayer.js';
import ZonesJson from '@/assets/json/ExampleZones.json';
import { usePolygonGrid } from "@/biz/Cesium/usecase/usePolygonGrid.js"
const { setupPolygonFillShape, setupPolygonImageShape } = usePolygonGrid();
const { mapview } = useCesium();
const { gather, setupLayer } = usePrimitiveLayer(mapview);
const controller = setupLayer({
    render: PrimitiveCollection,
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
    const { NAME } = attr;

    setupFloatHide();
    dialog.setupTitle(NAME);
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

function executeQuery() {
    ZonesJson.features.forEach(({ attributes, geometry }) => {

        const positions = geometry.rings.flat(2);
        const options = { attr: attributes, positions }
        enity.add(new GroundPrimitive(setupPolygonImageShape(options)))
    })
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
    <div class="ExampleZones">
        <div class="ExampleZones-console">
            <div class="ExampleZones-console-item">
                <div>水库-显示隐藏</div>
                <el-button type="primary" plain @click="pointController">切换</el-button>
            </div>
        </div>
        <div class="ExampleZones-illustrate">
            水库(面)示例
        </div>

    </div>
</template>

<style scoped lang='scss'>
.ExampleZones {
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
