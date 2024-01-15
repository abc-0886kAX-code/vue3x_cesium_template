import { initPlace } from '@/config/cesium.conf.js';
import { useCesium } from '@/biz/Cesium/usecase/useCesium';
import { Cartesian3, Math as CesiumMath } from 'cesium';
import { mergeObject } from "~/shared/merge";


export function useResetCamera(props) {
    const { mapview } = useCesium();
    const config = mergeObject(initPlace, props);

    function reset() {
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
