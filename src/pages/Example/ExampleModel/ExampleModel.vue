<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExampleModel\ExampleModel.vue
 * @Author: abc-0886kAX-code
 * @Date: 2023-11-29 10:05:54
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-01-15 16:17:37
 * @Description:
-->
<script setup>
import { CesiumFloatSymbolName } from '@/biz/Cesium/share/context';
import { usePopup } from "@/biz/Popup/usecase/usePopup";
import { useCesiumEvent } from '@/biz/Cesium/usecase/useCesiumEvent';
import { setupFloat } from './float.conf';

import { useResetCamera } from '@/biz/Cesium/usecase/useResetCamera.js';
import { Cartesian3, PrimitiveCollection, Transforms, defined } from 'cesium';
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import { usePrimitiveLayer } from '@/biz/Cesium/usecase/usePrimitiveLayer.js';
import { useModel } from '@/biz/Cesium/usecase/useModel.js';

const roam = useResetCamera();
const { setupModelByUrl } = useModel();
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
function handlerClick({ primitive, id }) {
    const { metadata } = primitive;
    const propertyKeys = metadata.getPropertyIds();
    if (!defined(propertyKeys)) {
        console.error('No properties for this feature')
    }
    let attr = {};
    for (let i = 0; i < propertyKeys.length; i++) {
        const propertyKey = propertyKeys[i];
        const propertyValue = metadata.getProperty(propertyKey);
        attr[propertyKey] = propertyValue;
    }

    setupFloatHide();
    dialog.setupTitle(attr.author);
    dialog.show(attr);
}

function handlerOver({ primitive, endPosition }) {
    const { metadata } = primitive;
    const propertyKeys = metadata.getPropertyIds();
    if (!defined(propertyKeys)) {
        console.error('No properties for this feature')
    }
    let attr = {};
    for (let i = 0; i < propertyKeys.length; i++) {
        const propertyKey = propertyKeys[i];
        const propertyValue = metadata.getProperty(propertyKey);
        attr[propertyKey] = propertyValue;
    }


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



async function executeQuery() {
    // 位置
    const modelMatrix = Transforms.eastNorthUpToFixedFrame(
        Cartesian3.fromDegrees(116.416411, 40.249242, 0)
    );
    const tile = await setupModelByUrl({ url: 'model/MetadataGranularities/tileset.json', modelMatrix })
    enity.add(tile);
}

onMounted(() => {
    roam({
        position: [116.416411, 40.249242, 1000],
    })
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
                <div>模型-显示隐藏
                </div>
                <el-button type="primary" plain @click="pointController">切换</el-button>
            </div>
        </div>
        <div class="ExampleModel-illustrate">
            模型示例
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
