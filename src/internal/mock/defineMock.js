/*
 * @FilePath: /Furnace/src/internal/mock/defineMock.js
 * @Author: maggot-code
 * @Date: 2022-12-04 02:38:01
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-12-04 21:52:19
 * @Description: 
 */
import Mock from "mockjs";
import { mergeObject } from "~/shared/merge";
import { transURL } from "~/shared/trans";

export function defineMock(props) {
    const config = mergeObject({
        url: "",
        method: "GET",
        prefix: import.meta.env.VITE_APP_SERVER_PREFIX
    }, props);
    const prefix = get(config, "prefix", "");
    const url = get(config, "url", "");
    const method = get(config, "method", "GET");

    const uri = new RegExp(`^${prefix + url}.*?`);
    const type = toLower(method);

    function mock(handler) {
        return () => Mock.mock(uri, type, (request) => {
            const params = transURL(request.url);
            const body = JSON.parse(request.body);
            return handler(mergeObject(request, { params, body }));
        });
    }

    return mock;
}
