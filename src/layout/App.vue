<!--
 * @FilePath: \vue3x_cesium_template\src\layout\App.vue
 * @Author: abc-0886kAX-code
 * @Date: 2022-11-21 14:19:59
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-03-11 12:59:26
 * @Description:
-->
<script setup>
import Popup from "@/layout/Popup.vue";
import ProgressMask from "@/components/ProgressMask.vue";
</script>

<template>
    <div id="app">
        <ProgressMask></ProgressMask>
        <Popup>
            <RouterView v-slot="{ Component }">
                <transition name="el-fade-in-linear">
                    <component :is="Component" />
                </transition>
            </RouterView>
        </Popup>
    </div>
</template>

<style scoped lang="scss"></style>
