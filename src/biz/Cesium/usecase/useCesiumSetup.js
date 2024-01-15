/*
 * @Author: abc-0886kAX-code
 * @Date: 2023-11-29 10:55:30
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-12-05 13:15:36
 * @Description: file content
 */
import { Load } from "@/biz/share/entify/Load";
import { Mapview } from "../entity/Mapview";
import { CesiumSymbolName } from "../share/context";
import { useAttach } from "./useAttach";


export function useCesiumSetup(props, emits) {
    const { loading, loadStyle, setupLoading } = Load();

    const isMounted = ref(false);

    const mapbox = ref(null);

    const mapview = new Mapview(props.config);

    const mapviewRef = useAttach(mapview, mapbox);

    provide(CesiumSymbolName, mapviewRef);

    onMounted(() => {
        mapview.onReady(() => {
            emits("onReady", mapview.view);
            setupLoading(false);
            isMounted.value = true;
        });
    });

    onUnmounted(() => {
        isMounted.value = false;
    });

    return {
        isMounted,
        loading,
        loadStyle,
        mapbox,
        mapview,
        setupLoading,
    };
}
