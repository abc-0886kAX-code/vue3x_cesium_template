/*
 * @FilePath: \vue3x_cesium_template\src\hooks\useElement.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-11-27 14:50:41
 * @LastEditors: abc-0886kAX-code
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
