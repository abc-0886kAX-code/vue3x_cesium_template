/*
 * @FilePath: \Furnace\src\hooks\ref\useShallowObject.js
 * @Author: maggot-code
 * @Date: 2022-12-04 01:42:31
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-12-05 18:07:13
 * @Description: 
 */
import { transObject } from "~/shared/trans";
import { mergeObject } from "~/shared/merge";
import { useComplexState } from "@/hooks/ref/useRefState";

export function useShallowObject(dataSource) {
    const source = shallowRef(transObject(dataSource));
    const state = useComplexState(source, Reflect.ownKeys);
    function setup(value) {
        source.value = transObject(value);
        return unref(source);
    }
    function into(value) {
        const data = clone(unref(source));
        return setup(mergeObject(data, transObject(value)));
    }
    function bind(path, value) {
        const data = clone(unref(source));
        set(data, path, value);
        return setup(data);
    }
    function take(path, defaultValue = null) {
        if (unref(state.empty)) return defaultValue;
        return get(unref(source), path, defaultValue);
    }
    function has(path) {
        const state = get(unref(source), path, null);
        return !isNil(state);
    }
    function remove(keyword) {
        const data = omit(unref(source), keyword);
        return setup(data);
    }
    function clear() {
        return setup({});
    }
    return {
        source,
        state,
        setup,
        into,
        bind,
        take,
        has,
        remove,
        clear
    }
}
