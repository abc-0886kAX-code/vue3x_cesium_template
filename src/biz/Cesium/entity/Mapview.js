/*
 * @Author: zhangxin
 * @Date: 2022-04-25 09:19:13
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-04 18:07:11
 * @Description: file content
 */
import { uuid } from "@/shared/uuid.js";
import { Viewer, EventHelper, Ion, ScreenSpaceEventHandler, defined, ScreenSpaceEventType } from 'cesium'
const { VITE_CESIUMTOKEN } = import.meta.env;

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
        this.view.scene.debugShowFramesPerSecond = true; // 显示帧率

        const handler = new ScreenSpaceEventHandler(this.view.scene.canvas);
        handler.setInputAction((e) => {
            var pick = this.view.scene.pick(e.position);
            if (defined(pick)) {
                // 点位可以通过pick.id获取额外参数
                // 线段
                // 面

                console.log(pick);
            }
        }, ScreenSpaceEventType.LEFT_CLICK);

        return this.view;
    }
    uninstall() {
        this.view.destroy();
        this.view = null;
    }
}
