/*
 * @FilePath: \Furnace\src\hooks\useElement.js
 * @Author: zhangxin
 * @Date: 2022-11-27 14:50:41
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-12-02 15:57:23
 * @Description: 
 */
export function useElementRefs() {
    const refs = ref(null);
    const ready = computed(() => !isNil(unref(refs)));

    return {
        refs,
        ready,
    }
}

export default useElementRefs;
