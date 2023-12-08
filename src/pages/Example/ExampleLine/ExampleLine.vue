<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExampleLine\ExampleLine.vue
 * @Author: zhangxin
 * @Date: 2023-11-29 10:05:54
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-08 09:39:39
 * @Description:
-->
<script setup>
import { CesiumFloatSymbolName } from '@/biz/Cesium/share/context';
import { usePopup } from "@/biz/Popup/usecase/usePopup";
import { useCesiumEvent } from '@/biz/Cesium/usecase/useCesiumEvent';
import { setupFloat } from './float.conf';

import { Cartesian3, GroundPolylinePrimitive, PrimitiveCollection } from 'cesium';
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import { usePrimitiveLayer } from '@/biz/Cesium/usecase/usePrimitiveLayer.js';
import LineJson from '@/assets/json/ExampleLine.json';
import { usePolyline } from '@/biz/Cesium/usecase/usePolyline.js';
const { setupPolylineFillShape, setupPolylineImageShape } = usePolyline()
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
    LineJson.features.forEach(({ attributes, geometry }) => {
        const positions = geometry.paths[0].flat(2);
        const options = {
            positions,
            width: 5,
            attr: attributes
        }
        enity.add(new GroundPolylinePrimitive(setupPolylineFillShape(options)))
    })
}

onMounted(() => {
    unref(mapview).camera.flyTo({
        destination: Cartesian3.fromDegrees(116.416411, 40.249242, 409882)
    });
    executeQuery();
})

onBeforeUnmount(() => {
    controllerEnity.clear();
})
</script>

<template>
    <div class="ExampleLine">
        <el-button type="primary" plain @click="pointController">线段显隐</el-button>
    </div>
</template>

<style scoped lang='scss'>
.ExampleLine {
    position: absolute;
    top: 5px;
    left: 150px;
    z-index: 999;
}
</style>
