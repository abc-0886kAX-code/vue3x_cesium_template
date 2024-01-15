<!--
 * @FilePath: \vue3x_cesium_template\src\components\DialogLayout.vue
 * @Author: abc-0886kAX-code
 * @Date: 2023-03-09 16:09:30
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-03-09 16:16:54
 * @Description:
-->
<script setup>
import { useTabs } from "@/biz/Tabs";

const props = defineProps({
    tabProps: {
        type: Array,
        default: () => [],
    },
});
const { active, component, dataset, update } = useTabs({
    data: props.tabProps,
});

function tabClick(entity) {
    update({ keyword: entity.name });
}
</script>

<template>
    <div class="dialog-layout">
        <div class="dialog-layout-tabs">
            <el-tabs :value="active" type="card" @tab-click="tabClick">
                <template v-for="entity in dataset">
                    <el-tab-pane :key="entity.keyword" :label="entity.label" :name="entity.keyword"></el-tab-pane>
                </template>
            </el-tabs>
        </div>
        <div class="dialog-layout-body">
            <slot :active="active" :tem="component"></slot>
            <!-- <components :key="active" :is="component" :popupKeyword="props.popupKeyword"></components> -->
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/dialog-tab.scss";
</style>
