/*
 * @FilePath: \Furnace\src\hooks\useShallowObject.js
 * @Author: maggot-code
 * @Date: 2022-11-22 12:50:47
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-22 13:15:55
 * @Description: 
 */
import { toPlainObject } from "@/shared/trans";

export function defineShallowObject(rawSource) {
    const source = shallowRef(toPlainObject(rawSource));
    const size = computed(() => Reflect.ownKeys(unref(source)).length);
    const empty = computed(() => unref(size) <= 0);

    function setup(value) {
        source.value = toPlainObject(value);

        return source;
    }
    function bind(path, value) {
        const data = cloneDeep(unref(source));
        set(data, path, value);

        return setup(data);
    }
    function take(path, defaultValue = null) {
        if (unref(empty)) return defaultValue;

        return get(unref(source), path, defaultValue);
    }
    function clear() {
        return setup({});
    }

    return {
        source,
        size,
        empty,
        setup,
        bind,
        take,
        clear
    }
}

export default defineShallowObject;
