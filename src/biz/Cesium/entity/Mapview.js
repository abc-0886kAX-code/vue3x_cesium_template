/*
 * @Author: zhangxin
 * @Date: 2022-04-25 09:19:13
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-29 09:55:45
 * @Description: file content
 */
import { uuid } from "@/shared/uuid.js";
import { Viewer, EventHelper, Ion, WebMapTileServiceImageryProvider, Math, Cartesian3 } from 'cesium'
const { VITE_CESIUMTOKEN, DEV, VITE_TDT_KEY } = import.meta.env;

import { initPlace } from '@/config/cesium.conf.js';

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
            url: "https://{s}.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=" + VITE_TDT_KEY,
            layer: "tdtAnnoLayer",
            style: "default",
            format: "image/jpeg",
            tileMatrixSetID: "GoogleMapsCompatible",
            subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            maximumLevel: 18,
        }))
        // 修改homeButton的默认返回位置
        let _that = this;
        this.view.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
            e.cancel = true;
            _that.view.camera.flyTo({
                destination: Cartesian3.fromDegrees(...initPlace.position),
                orientation: {
                    pitch: Math.toRadians(initPlace.pitch),
                    heading: Math.toRadians(initPlace.heading),
                },
            })
        })

        return this.view;
    }
    uninstall() {
        this.view.destroy();
        this.view = null;
    }
}
