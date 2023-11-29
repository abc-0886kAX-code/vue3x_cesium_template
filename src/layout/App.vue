<!--
 * @FilePath: \vue3x_template-master\src\layout\App.vue
 * @Author: maggot-code
 * @Date: 2022-11-21 14:19:59
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-11-29 13:34:38
 * @Description:
-->
<script setup>
import { MainLayout } from "@/layout/main-layout";
import Popup from "@/layout/Popup.vue";
import ProgressMask from "@/components/ProgressMask.vue";
</script>

<template>
    <div id="app">
        <ProgressMask></ProgressMask>
        <Popup>
            <MainLayout></MainLayout>
        </Popup>
    </div>
</template>

<style scoped lang="scss">
</style>
