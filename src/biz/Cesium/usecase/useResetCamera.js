/*
 * @FilePath: \vue3x_cesium_template\src\biz\Cesium\usecase\useResetCamera.js
 * @Author: abc-0886kAX-code
 * @Date: 2024-01-15 10:59:51
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-01-15 16:23:29
 * @Description:
 */
import { initPlace } from '@/config/cesium.conf.js';
import { useCesium } from '@/biz/Cesium/usecase/useCesium';
import { Cartesian3, Math as CesiumMath } from 'cesium';
import { mergeObject } from "~/shared/merge";


export function useResetCamera() {
    const { mapview } = useCesium();

    function reset(props) {
        const config = mergeObject(initPlace, props);
        unref(mapview).camera.flyTo({
            destination: Cartesian3.fromDegrees(...config.position),
            orientation: {
                pitch: CesiumMath.toRadians(config.pitch),
                heading: CesiumMath.toRadians(config.heading),
            },
        });
    }

    return reset
};
export default useResetCamera;
