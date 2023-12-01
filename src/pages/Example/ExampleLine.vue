<!--
 * @FilePath: \vue3x_cesium_template\src\pages\home\home.vue
 * @Author: zhangxin
 * @Date: 2023-11-29 10:05:54
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-01 14:45:17
 * @Description:
-->
<script setup>
import { Cartesian3 } from 'cesium';
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';
import {usePrimitiveLayer} from '@/biz/Cesium/usecase/usePrimitiveLayer.js';

const { mapview } = useCesium();
const layer = usePrimitiveLayer(mapview);
console.log(mapview);

onMounted(() => {
    unref(mapview).camera.flyTo({
        destination: Cartesian3.fromDegrees(116.416411, 40.249242, 409882)
    });
})
</script>

<template>
    <div></div>
</template>

<style scoped lang='scss'>
</style>
