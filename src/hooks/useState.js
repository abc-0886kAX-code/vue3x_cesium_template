/*
 * @FilePath: \Furnace\src\hooks\useState.js
 * @Author: maggot-code
 * @Date: 2022-11-21 15:35:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-22 11:36:49
 * @Description: 
 */
import { toBoolean } from "@/shared/trans";

export function defineState(rawState) {
    const dataSource = ref(toBoolean(rawState));
    const state = computed(() => unref(dataSource));
    const usable = computed(() => unref(state) === true);
    const unusable = computed(() => unref(usable) === false);

    function setup(value) {
        dataSource.value = toBoolean(value);
    }
    function toSwitch() {
        setup(!unref(dataSource));
    }
    function toEnable() {
        setup(true);
    }
    function toDisable() {
        setup(false);
    }

    return {
        state,
        usable,
        unusable,
        setup,
        toSwitch,
        toEnable,
        toDisable,
    }
}

export default defineState;
