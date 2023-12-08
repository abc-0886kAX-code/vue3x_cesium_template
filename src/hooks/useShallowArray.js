/*
 * @FilePath: \Furnace\src\hooks\useShallowArray.js
 * @Author: zhangxin
 * @Date: 2022-11-22 13:11:19
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-11-22 13:16:25
 * @Description: 
 */
import { toArray } from "@/shared/trans";

export function defineShallowArray(rawSource) {
    const source = shallowRef(toArray(rawSource));
    const size = computed(() => unref(source).length);
    const empty = computed(() => unref(size) <= 0);

    function setup(value) {
        source.value = toArray(value);

        return source;
    }
    function insert() { }
    function remove() { }
    function find() { }
    function clear() {
        return setup([]);
    }

    return {
        source,
        size,
        empty,
        setup,
        insert,
        remove,
        find,
        clear
    }
}

export default defineShallowArray;
