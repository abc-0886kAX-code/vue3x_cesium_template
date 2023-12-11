/*
 * @FilePath: \vue3x_cesium_template\src\config\cesium.conf.js
 * @Author: zhangxin
 * @Date: 2023-11-29 14:20:16
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-11 17:00:02
 * @Description:
 */
import * as Cesium from 'cesium';
import { BJ_AREA_SERVICE } from "@/config/arcgis.conf";

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
    terrain: Cesium.Terrain.fromWorldTerrain(),
    selectionIndicator: false, // 选中图层后 显示的默认绿色框
    // 天地图底图
    baseLayer: new Cesium.ImageryLayer(new Cesium.WebMapTileServiceImageryProvider({
        //影像底图
        url: "http://{s}.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
            "&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
            "&style=default&format=tiles&tk=" + 'ef590000990e247813bf916bdce1d941',
        layer: "tdtImgLayer",
        style: "default",
        format: "tiles",
        tileMatrixSetID: "c",
        subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        tilingScheme: new Cesium.GeographicTilingScheme(),
        tileMatrixLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
        maximumLevel: 50,
        show: true
    })),
}
const layers = [
    {
        type: "arcgis",
        url: BJ_AREA_SERVICE,
        maximumLevel: 18
    }
]
export { config, layers }
