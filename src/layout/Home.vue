<!--
 * @FilePath: \vue3x_cesium_template\src\layout\Home.vue
 * @Author: zhangxin
 * @Date: 2023-04-12 13:14:28
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-08 11:22:06
 * @Description:
-->
<script setup>
import { CesiumContainer } from '@/biz/Cesium/view/cesium-container';
import { config, layers } from '@/config/cesium.conf';

import { useUserStore } from "@/store/useUser";
const { proxy } = getCurrentInstance();
const user = useUserStore();
function handleUser(params) { }
const featurelist = {
    'userLogout': {
        label: '注销登录',
        func: userLogout
    },
    'ExamplePoint': {
        label: 'Cesium示例-点',
        func: jumpToPage
    },
    'ExampleLine': {
        label: 'Cesium示例-线',
        func: jumpToPage
    },
    'ExampleZones': {
        label: 'Cesium示例-面',
        func: jumpToPage
    },
    'ExampleGeojson': {
        label: 'Cesium示例-Geojson',
        func: jumpToPage
    },
    'ExampleImages': {
        label: 'Cesium示例-图片',
        func: jumpToPage
    }
}
function handleCommand(command) {
    featurelist[command].func(command);
}
function userLogout() {
    user.emptyUserInfo();
    proxy.$router.push({ name: "login" });
}
function jumpToPage(name) {
    proxy.$router.push({ name });
}
</script>

<template>
    <el-container class="home">
        <el-dropdown class="home-user" split-button type="primary" @command="handleCommand"
            @click="handleUser">
            功能菜单
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="(item, key) in featurelist" :key="key" :command="key">{{ item.label
                    }}</el-dropdown-item>
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
@/config/cesium.conf
