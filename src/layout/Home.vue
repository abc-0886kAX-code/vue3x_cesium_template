<!--
 * @FilePath: \vue3x_cesium_template-master\src\layout\Home.vue
 * @Author: zhangxin
 * @Date: 2023-04-12 13:14:28
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-11-29 14:22:32
 * @Description:
-->
<script setup>
import { CesiumContainer } from '@/biz/Cesium/view/cesium-container';
import { config, layers } from '@/config/cesiumconfig';

import { useUserStore } from "@/store/useUser";
const { proxy } = getCurrentInstance();
const user = useUserStore();
function handleUser(params) { }
function handleCommand(command) {
    command === "userLogout" && userLogout();
}
function userLogout() {
    user.emptyUserInfo();
    proxy.$router.push({ name: "login" });
}
</script>

<template>
    <el-container class="home">
        <el-dropdown class="home-user" size="small" split-button type="primary" @command="handleCommand"
            @click="handleUser">
            用户名称
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="userLogout">注销登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <RouterView v-slot="{ Component }">
            <transition name="el-fade-in-linear">
                <CesiumContainer :config="config" :layers="layers">
                    <component :is="Component" />
                </CesiumContainer>
            </transition>
        </RouterView>
    </el-container>
</template>

<style scoped lang="scss">
.home {
    background-color: transparent;
    width: 100%;
    height: 100%;
    overflow: hidden;

    &-user {
        position: absolute;
        z-index: 99;
        left: 5px;
        top: 5px;
    }
}
</style>
