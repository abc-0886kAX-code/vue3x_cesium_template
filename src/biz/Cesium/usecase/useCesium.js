/*
 * @Author: abc-0886kAX-code
 * @Date: 2022-04-25 10:30:17
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-11-29 14:27:09
 * @Description: file content
 */
import { CesiumSymbolName } from "../share/context";

export function useCesium() {
    const mapviewRef = inject(CesiumSymbolName, shallowRef(null));

    const mapview = computed(() => {
        return mapviewRef.value.view;
    });

    return {
        mapview,
    };
}
