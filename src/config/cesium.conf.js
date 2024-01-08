/*
 * @FilePath: \vue3x_cesium_template\src\config\cesium.conf.js
 * @Author: zhangxin
 * @Date: 2023-11-29 14:20:16
 * @LastEditors: zhangxin
 * @LastEditTime: 2024-01-08 15:15:41
 * @Description:
 */
import * as Cesium from 'cesium';
import { BJ_AREA_SERVICE } from "@/config/arcgis.conf";
const { VITE_TDT_KEY } = import.meta.env

// 初始化位置
export const initPlace = {
    position: [116.416411, 38.849242, 409882],
    pitch: -70,
    heading: 0
}

const config = {
    infoBox: false, // 创建InfoBox小部件 默认true - false解决报错
    timeline: false, // 创建时间轴小部件 默认true
    animation: false, // 创建动画小部件 默认true
    baseLayerPicker: false,//地图图层组件
    fullscreenButton: true,//全屏组件
    geocoder: true,//地理编码搜索组件
    homeButton: true,//首页组件
    sceneModePicker: true,//场景模式
    selectionIndicator: true,//选取指示器组件
    navigationHelpButton: true,//帮助按钮
    navigationInstructionsInitiallyVisible: false, // 如果导航说明最初应该是可见的，则为true；如果直到用户明确单击该按钮，则不显示该说明，否则为false。
    // terrain: Cesium.Terrain.fromWorldTerrain(), 不知道为啥地形不能继续使用了，token过期，和cesium.ion的token没有关系
    selectionIndicator: false, // 选中图层后 显示的默认绿色框
    // 天地图底图
    baseLayer: new Cesium.ImageryLayer(new Cesium.UrlTemplateImageryProvider({
        url: "https://{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=" + VITE_TDT_KEY,
        subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
        maximumLevel: 18,
    }))
}
const layers = [
    {
        type: "arcgis",
        url: BJ_AREA_SERVICE,
        maximumLevel: 18
    }
]
export { config, layers }
