/*
 * @Author: abc-0886kAX-code
 * @Date: 2022-04-21 09:14:41
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2022-11-22 14:53:21
 * @Description: file content
 */

export const loadStyle = {
    "element-loading-text": "请稍后..",
    "element-loading-spinner": "el-icon-loading",
    "element-loading-background": "rgba(16, 36, 75, 0.6)",
};

export function Load(status = true) {
    const loading = ref(status);
    const setupLoading = (status = false) => {
        loading.value = status;
    };

    provide("loading", {
        loading,
        setupLoading,
    });

    return {
        loading,
        loadStyle,
        setupLoading,
    };
}
