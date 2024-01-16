<!--
 * @FilePath: \vue3x_cesium_template\src\layout\Popup.vue
 * @Author: abc-0886kAX-code
 * @Date: 2023-01-03 16:58:44
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-01-16 13:21:14
 * @Description:
-->
<script setup>
import { definePopup } from "@/biz/Popup/usecase/definePopup";

const { pond, pondFind, pondRelease } = definePopup();
</script>

<template>
    <div class="furnace-popup">
        <template v-for="key in pond" :key="key">
            <el-dialog :before-close="pondRelease(key)" :model-value="pondFind(key).visible.value"
                :title="pondFind(key).title.value" :width="pondFind(key).width.value" :top="pondFind(key).top.value"
                v-bind="pondFind(key).constProps" draggable>
                <div class="furnace-popup-main" :ref="pondFind(key).refs" :style="{ height: pondFind(key).height.value }">
                    <template v-if="pondFind(key).visible.value">
                        <component :is="pondFind(key).template" :popupKeyword="key" />
                    </template>
                </div>
            </el-dialog>
        </template>
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
:deep(.el-dialog__title) {
    min-width: 100px;
    text-align: center;
    display: block;
    position: relative;
}

:deep(.el-dialog__title)::after {
    width: 35px;
    height: 35px;
    content: "";
    position: absolute;
    left: -40px;
    top: -5px;
    background: url("@/assets/images/dialog/titimg.png") no-repeat;
    background-position: 0px 0px;
}

:deep(.el-dialog__title)::before {
    width: 35px;
    height: 35px;
    content: "";
    position: absolute;
    right: -40px;
    top: -5px;
    background: url("@/assets/images/dialog/titimg-ri.png") no-repeat;
    background-position: 0px 0px;
}
</style>
