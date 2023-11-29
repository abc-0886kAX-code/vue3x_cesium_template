```vue
<script setup>
import { useTabs } from "@/biz/Tabs";

const { active, component, dataset, setup, update } = useTabs({
    data: [
        {
            keyword: "tab1",
            label: "大厅 - 水生态",
            template: () => import("@/pages/hall-st/hall-st.vue"),
        },
        {
            keyword: "tab2",
            label: "大厅 - 水文化",
            template: () => import("@/pages/hall-wh/hall-wh.vue"),
        },
        {
            keyword: "tab3",
            label: "大厅 - 水环境",
            template: () => import("@/pages/hall-hj/hall-hj.vue"),
        }
    ]
});
</script>

<template>
    <div class="debug">
        <div class="debug-head">
            <template v-for="(entity) in dataset">
                <el-button @click="update(entity)" v-if="entity.keyword === active"
                    type="success">{{ entity.label }}</el-button>
                <el-button @click="update(entity)" v-else type="primary">{{ entity.label }}</el-button>
            </template>
        </div>
        <div class="debug-body">
            <transition name="el-fade-in-linear">
                <components :key="active" :is="component"></components>
            </transition>
        </div>
    </div>
</template>

<style scoped lang='scss'>
.debug {
    width: 100%;
    height: 100%;

    &-head {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 32px;
        overflow: hidden;
    }

    &-body {
        position: relative;
        width: 100%;
        height: calc(100% - 32px);
        overflow: hidden;
    }
}
</style>
```
