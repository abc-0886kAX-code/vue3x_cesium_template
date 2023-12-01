/*
 * @FilePath: \vue3x_cesium_template\src\config\cesiumconfig.js
 * @Author: zhangxin
 * @Date: 2023-11-29 14:20:16
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-01 14:37:28
 * @Description:
 */
import * as Cesium from 'cesium';
import { BJ_AREA_SERVICE } from "@/config/arcgis.conf";

const config = {
    infoBox: false, // 创建InfoBox小部件 默认true - false解决报错
    timeline: false, // 创建时间轴小部件 默认true
    animation: false, // 创建动画小部件 默认true
    baseLayerPicker: true,//地图图层组件
    fullscreenButton: true,//全屏组件
    geocoder: true,//地理编码搜索组件
    homeButton: true,//首页组件
    sceneModePicker: true,//场景模式
    selectionIndicator: true,//选取指示器组件
    navigationHelpButton: true,//帮助按钮
    navigationInstructionsInitiallyVisible: false, // 如果导航说明最初应该是可见的，则为true；如果直到用户明确单击该按钮，则不显示该说明，否则为false。
    terrain: Cesium.Terrain.fromWorldTerrain(),
}
const layers = [
    {
        type: "arcgis",
        url: BJ_AREA_SERVICE
    }
]
export { config, layers }
