<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExampleRoam\ExampleRoam.vue
 * @Author: abc-0886kAX-code
 * @Date: 2024-01-11 09:34:22
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-01-15 17:34:06
 * @Description:
-->
<script setup>
import Roam from './roam.json';
import { pathStyle, billboard } from './config.js';
import { Cartesian3, CzmlDataSource, LagrangePolynomialApproximation, Matrix4 } from "cesium"
import { useCesium } from '@/biz/Cesium/usecase/useCesium';
const { mapview } = useCesium();

let flyEntity = ref(null);
const target = new Cartesian3.fromDegrees(120.189, 30.254, 300)
function setRoamView() {
    if (unref(flyEntity)) {
        const center = unref(flyEntity).position.getValue(unref(mapview).clock.currentTime)
        if (center) {
            const vector = new Cartesian3(target.x - center.x, target.y - center.y, 300)
            unref(mapview).camera.lookAt(center, vector)
        }
    }
}
const RoamMap = ref(Roam);
function readyRoam() {
    unref(mapview).dataSources.removeAll();
    unref(mapview).dataSources.add(CzmlDataSource.load(unref(RoamMap))).then((ds) => {
        flyEntity.value = ds.entities.getById('path')

        unref(flyEntity).position.setInterpolationOptions({
            interpolationDegree: 5,
            interpolationAlgorithm: LagrangePolynomialApproximation
        })
    })
}
const isPathChoice = computed(() => {
    return !isNull(unref(flyEntity));
})
function onStart() {
    readyRoam()
    unref(mapview).trackedEntity = unref(flyEntity)
    unref(mapview).scene.preUpdate.addEventListener(setRoamView)
}
function onEnd() {
    flyEntity.value = null
    mapview.value.trackedEntity = null
    unref(mapview).scene.preUpdate.removeEventListener(setRoamView)
    unref(mapview).dataSources.removeAll();
    // 结束后鼠标左键以及滚轮事件被改变 需要重置 bug`
    // 20240115 不需要重置鼠标事件，解除视角锁定即可
    unref(mapview).camera.lookAtTransform(Matrix4.IDENTITY);
}
const pathChoice = ref(false);
function pathChange(val) {
    pathChoice.value = val;
    if (unref(pathChoice)) {
        RoamMap.value[1].path = pathStyle;
        RoamMap.value[1].billboard = billboard;
    } else {
        RoamMap.value[1].path = {
            "width": 0,
            "leadTime": 10,
            "trailTime": 1000,
            "resolution": 5
        }
        RoamMap.value[1].billboard = {};
    }
}

</script>

<template>
    <div class="ExampleRoam">
        <div class="ExampleRoam-console">
            <div class="ExampleRoam-console-item">
                <div>漫游-路径</div>
                <el-checkbox :model-value="pathChoice" label="选择" :checked="pathChoice" border :disabled="isPathChoice"
                    @change="pathChange" />
            </div>
            <div class="ExampleRoam-console-item">
                <div>漫游-开始</div>
                <el-button type="primary" plain @click="onStart">开始</el-button>
            </div>
            <div class="ExampleRoam-console-item">
                <div>漫游-结束</div>
                <el-button type="primary" plain @click="onEnd">结束</el-button>
            </div>
        </div>
        <div class="ExampleRoam-illustrate">
            漫游示例
        </div>
    </div>
</template>

<style scoped lang='scss'>
.ExampleRoam {
    &-console {
        position: absolute;
        top: 5px;
        left: 150px;
        z-index: 999;
        background: #232323;
        height: 135px;
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

:deep(.el-checkbox) {
    color: #fff;
}
</style>
