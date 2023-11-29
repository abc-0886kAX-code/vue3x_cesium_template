<!--
 * @Author: zhangxin
 * @Date: 2022-04-29 09:22:25
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-11-29 10:53:27
 * @Description: file content
-->
<script setup>
import { useElementSize } from "@vueuse/core";

const props = defineProps({
    visable: {
        type: Boolean,
        default: false,
    },
    positionStyle: {
        type: Object,
        default: () => ({
            left: 0,
            top: 0,
        }),
    },
    content: {
        type: Array,
        default: () => [],
    },
});

const floatRefs = ref(null);
const { width, height } = useElementSize(floatRefs);

const style = computed(() => {
    const { left, top } = props.positionStyle;
    const x = left - unref(width) - unref(width) / 2.5;
    const y = top - unref(height) / 2;
    return {
        left: `${x}px`,
        top: `${y}px`,
    };
});
</script>

<template>
    <div class="float-window" v-show="visable" ref="floatRefs" :style="style">
        <template v-for="item in content" :key="item.field">
            <div class="float-window-item">
                <p class="float-window-item-label">{{ item.label }}：</p>
                <p class="float-window-item-text" :style="item.style">
                    {{ item.text }}
                </p>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
@import "./float-window.scss";
</style>
