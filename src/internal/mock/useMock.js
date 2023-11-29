/*
 * @FilePath: /Furnace/src/internal/mock/useMock.js
 * @Author: maggot-code
 * @Date: 2022-12-04 02:50:19
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-12-04 22:24:06
 * @Description: 
 */
import Mock from "mockjs";

const Keyword = "mock";

export function isMock() {
    // 匹配 import.meta.env.MODE 是否包含 mock
    return import.meta.env.MODE.includes(Keyword);
}

export function useMock() {
    if (!isMock()) return;

    console.log("mock server start");

    Mock.setup({
        timeout: "800-1200",
    });

    const modules = import.meta.glob("../../**/{mock.js,*.mock.js}", { eager: true });
    Object.keys(modules).forEach((path) => {
        if (!isFunction(modules[path].default)) return;

        modules[path].default();
    });
}

export default useMock;
