<script setup lang='ts'>
import { storeToRefs } from "pinia";
import { useProgressMask } from "@/store/useProgressMask";

const progressMaskStore = useProgressMask();
const { active, desc, percentage } = storeToRefs(progressMaskStore);

const customColors = [
    { color: '#f56c6c', percentage: 20 },
    { color: '#e6a23c', percentage: 40 },
    { color: '#5cb87a', percentage: 60 },
    { color: '#1989fa', percentage: 80 },
    { color: '#6f7ad3', percentage: 100 }
];
const maskClassName = computed(() => {
    return unref(active) ? ["progess-mask-active"] : [];
});

onUnmounted(() => {
    progressMaskStore.$reset();
});
</script>

<template>
    <div class="progress-mask" :class="maskClassName">
        <p class="progress-mask-desc">{{ desc }}</p>
        <div class="progress-mask-main">
            <el-progress stroke-linecap="square" :percentage="percentage" :color="customColors"
                :show-text="false"></el-progress>
        </div>
    </div>
</template>

<style scoped lang='scss'>
$maskColor: #333;

.progress-mask {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 10001;
    width: 0%;
    height: 0%;
    background-color: rgba($maskColor, 0.3);
    overflow: hidden;
    transform: translate(-50%, -50%);
    transform-origin: center;
    transition: all 0.3s ease-in-out;

    &-desc {
        width: 100%;
        height: 32px;
        line-height: 32px;
        font-size: 24px;
        color: #fff;
        text-align: center;
    }

    &-main {
        width: 50%;
    }
}

.progess-mask-active {
    width: 100%;
    height: 100%;
}
</style>
