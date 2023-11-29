<script setup>
import { Cartesian3 } from 'cesium';
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js';

const { mapview } = useCesium();


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
