<!--
 * @FilePath: \vue3x_cesium_template\src\layout\Home.vue
 * @Author: abc-0886kAX-code
 * @Date: 2023-04-12 13:14:28
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-01-15 10:52:31
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
    },
    'ExampleMask': {
        label: 'Cesium示例-遮罩层',
        func: jumpToPage
    },
    'ExampleModel': {
        label: 'Cesium示例-模型',
        func: jumpToPage
    },
    'ExampleTilesetModel': {
        label: 'Cesium示例-供水厂模型',
        func: jumpToPage
    },
    'ExampleWaterUpraise': {
        label: 'Cesium示例-水体抬升',
        func: jumpToPage
    },
    'ExampleRoam': {
        label: 'Cesium示例-漫游',
        func: jumpToPage
    },
    'ExampleWeather': {
        label: 'Cesium示例-天气',
        func: jumpToPage
    },
    'ExampleCuttingMap': {
        label: 'Cesium示例-地图切割',
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
        <el-dropdown class="home-user" split-button type="primary" plain @command="handleCommand" @click="handleUser">
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
        top: 15px;
    }
}
</style>
