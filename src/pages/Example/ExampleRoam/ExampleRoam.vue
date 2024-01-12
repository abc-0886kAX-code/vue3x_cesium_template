<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExampleRoam\ExampleRoam.vue
 * @Author: zhangxin
 * @Date: 2024-01-11 09:34:22
 * @LastEditors: zhangxin
 * @LastEditTime: 2024-01-12 10:38:32
 * @Description:
-->
<script setup>
import { Cartesian3, CzmlDataSource, LagrangePolynomialApproximation } from "cesium"
import { useCesium } from '@/biz/Cesium/usecase/useCesium';
const { mapview } = useCesium();

let flyEntity = {}
const target = new Cartesian3.fromDegrees(120.189, 30.254, 300)
function setRoamView() {
    if (flyEntity) {
        const center = flyEntity.position.getValue(unref(mapview).clock.currentTime)
        if (center) {
            const vector = new Cartesian3(target.x - center.x, target.y - center.y, 300)
            unref(mapview).camera.lookAt(center, vector)
        }
    }
}

function readyRoam() {
    unref(mapview).dataSources.add(CzmlDataSource.load('./roam.json')).then((ds) => {
        flyEntity = ds.entities.getById('path')

        flyEntity.position.setInterpolationOptions({
            interpolationDegree: 5,
            interpolationAlgorithm: LagrangePolynomialApproximation
        })
    })
}

function onStart() {
    unref(mapview).trackedEntity = flyEntity
    unref(mapview).scene.preUpdate.addEventListener(setRoamView)
}
function onEnd() {
    unref(mapview).trackedEntity = null
    unref(mapview).scene.preUpdate.removeEventListener(setRoamView)
}

onMounted(() => {
    readyRoam();
})

</script>

<template>
    <div class="ExampleRoam">
        <div class="ExampleRoam-console">
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
