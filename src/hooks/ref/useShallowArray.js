/*
 * @FilePath: \vue3x_cesium_template\src\hooks\ref\useShallowArray.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-12-04 01:42:19
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2022-12-09 10:17:36
 * @Description:
 */
import { transArray } from "~/shared/trans";
import { useComplexState } from "@/hooks/ref/useRefState";

export function useShallowArray(dataSource) {
    const source = shallowRef(transArray(dataSource));
    const state = useComplexState(source);

    function setup(value) {
        source.value = transArray(value);
        return unref(source);
    }
    function clear() {
        return setup([]);
    }
    return {
        source,
        state,
        setup,
        clear
    }
}

export default useShallowArray;
