/*
 * @Author: zhangyang
 * @Date: 2022-05-09 09:55:17
 * @LastEditTime: 2023-12-01 14:27:17
 */
const { VITE_ARCGIS_SERVER } = import.meta.env;

const setupServiceAddress = (server = "") => `${VITE_ARCGIS_SERVER}arcgis/rest/services/FX/${server}/MapServer`;

export const setupServiceID = (service, id) => `${service}/${id}`;

export const retainServiceBody = (url) => {
    console.log(url);
    const [_, body] = url.split(VITE_ARCGIS_SERVER);
    return body;
}

// 北京市区县边界
export const BJ_AREA_SERVICE = setupServiceAddress("BJAREA");

// 北京市中心城区边界
export const BJ_DOWNTOWN_AREA_SERVICE = setupServiceAddress("Boundary_New")

// 北京市/平谷区边界图层服务
export const BJ_PG_BOUNDARY_SERVICE = setupServiceAddress("Boundary");

// 潮白河全流域图层、密云水库账号专用遮罩图层
export const CBH_MY_BOUNDARY_SERVICE = setupServiceAddress("MYLY");

// 潮白河边界图层服务 CBLayer
export const CBH_BOUNDARY_SERVICE = setupServiceAddress("CBLayer");

// 蓟运河边界图层服务 JYHLayer
export const JYH_BOUNDARY_SERVICE = setupServiceAddress("JYHLayer");

// 北运河边界图层服务 BYHLayer
export const BYH_BOUNDARY_SERVICE = setupServiceAddress("BYHLayer");

// 永定河边界图层服务 YDHLayer
export const YDH_BOUNDARY_SERVICE = setupServiceAddress("YDHLayer");

// 大清河边界图层服务 DQHLayer
export const DQH_BOUNDARY_SERVICE = setupServiceAddress("DQHLayer");

// 水库图层服务
export const RESERVOIR_SERVICE = setupServiceAddress("RSVR");

// 河道图层服务
export const RIVER_SERVICE = setupServiceAddress("RIVER");

// 防洪堵口
export const FLOOD_CONTROL_PLUG_SERVICE = setupServiceAddress("TEST1217");

// 提房险工
export const DANGER_WORKER_SERVICE = setupServiceAddress("Embankment");

// 闸坝
export const DAM_SERVICE = setupServiceAddress("Dam");

// 村庄站点
export const VILLAGE_SERVICE = setupServiceAddress("Vectors");

//海绵处积水点
export const HMCSITE_SERVICE = setupServiceAddress("HMC");

//历史积水点
export const LSJSDSITE_SERVICE = setupServiceAddress("LSJSD");

// 河道断面
export const RIVER_SECTION = setupServiceAddress("lydm");

// 山洪沟道
export const DEFENSE_SERVICE = setupServiceAddress("山洪沟道");

