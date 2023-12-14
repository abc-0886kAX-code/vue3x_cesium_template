/*
 * @Author: zhangxin
 * @Date: 2022-04-25 09:19:13
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-14 16:38:30
 * @Description: file content
 */
import { uuid } from "@/shared/uuid.js";
import { Viewer, EventHelper, Ion, WebMapTileServiceImageryProvider, GeographicTilingScheme, Cartesian3 } from 'cesium'
const { VITE_CESIUMTOKEN, DEV, VITE_TDT_KEY } = import.meta.env;
export class Mapview {
    _id = uuid();
    view = null;
    config = {};
    constructor(config) {
        this.config = config;
    }
    proof(id) {
        return this._id === id;
    }
    onReady(handler) {
        const helper = new EventHelper();
        helper.add(this.view.scene.globe.tileLoadProgressEvent, (number) => {
            if (number > 0) {
                return;
            }

            handler();
        });
    }
    install(mapbox) {
        Ion.defaultAccessToken = VITE_CESIUMTOKEN; // 设置Cesium token
        this.view = new Viewer(mapbox, this.config);
        this.view._cesiumWidget._creditContainer.style.display = 'none'; // 隐藏Cesium logo
        this.view.scene.debugShowFramesPerSecond = DEV ? true : false; // 显示帧率

        // 天地图标注
        this.view.imageryLayers.addImageryProvider(new WebMapTileServiceImageryProvider({
            url: `http://{s}.tianditu.gov.cn/cia_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${VITE_TDT_KEY}`,
            layer: "tdtCiaLayer",
            style: "default",
            format: "tiles",
            tileMatrixSetID: "GoogleMapsCompatible",
            subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            tilingScheme: new GeographicTilingScheme(),
            tileMatrixLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
            maximumLevel: 50,
            show: true
        }))
        // 修改homeButton的默认返回位置
        let _that = this;
        this.view.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
            e.cancel = true;
            _that.view.camera.flyTo({
                destination: Cartesian3.fromDegrees(116.416411, 40.249242, 409882),
            })
        })

        return this.view;
    }
    uninstall() {
        this.view.destroy();
        this.view = null;
    }
}
