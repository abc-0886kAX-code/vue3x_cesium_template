/*
 * @FilePath: \vue3x_cesium_template\src\main.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-11-21 14:19:59
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-01-23 17:18:38
 * @Description:
 */
import { createApp } from 'vue'
import { extendRouter } from "@/extend/router";
import { extendPinia } from "@/extend/pinia";
import "./permission";
import App from "@/layout/App.vue";
import "normalize.css";
import "@/assets/style/index.scss";

createApp(App).use(extendRouter).use(extendPinia).mount("#app");
