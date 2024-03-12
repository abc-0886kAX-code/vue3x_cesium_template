<script setup>
import CuttingMap from "@/assets/images/example/cuttingmap.png"

import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import { useCuttingMap } from '@/biz/Cesium/usecase/useCuttingMap.js';
const { mapview } = useCesium();
const { executeCutting } = useCuttingMap(unref(mapview));

function executeCuttingMap() {
    executeCutting({
        center: [104.836844, 31.688768, 0],
        distance: 35000
    })
}
</script>

<template>
    <div class="ExampleCuttingMap">
        <div class="ExampleCuttingMap-console">
            <span>这里仅展示一张图片效果，实际使用时需要根据需求进行切割以及需要对地球进行一些设置，如隐藏光照、隐藏天空层等</span>

        </div>
        <div class="ExampleCuttingMap-images">

            <el-image style="width: 100%; height: 100%" :src="CuttingMap" :zoom-rate="1.2" :max-scale="7"
                :min-scale="0.2" :preview-src-list="[CuttingMap]" :initial-index="4" fit="cover" />
        </div>
        <div class="ExampleCuttingMap-illustrate">
            切割地图示例
        </div>
    </div>
</template>

<style scoped lang='scss'>
.ExampleCuttingMap {
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
        color: #fff;
    }

    &-images {
        position: absolute;
        top: 20%;
        left: 35%;
        z-index: 999;
        background: #232323;
        height: 500px;
        width: 600px;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 10px;
        color: #fff;
        text-align: center;
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
