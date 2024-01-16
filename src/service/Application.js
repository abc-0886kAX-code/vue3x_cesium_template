/*
 * @FilePath: \vue3x_cesium_template\src\service\Application.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-11-24 10:05:30
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-01-16 15:14:39
 * @Description:
 */
import axios from "axios";
import { defineService } from "~/service";
import { useTokenMiddleware } from "@/middleware/token.request";
const { VITE_API_BASE_URL_PRE } = import.meta.env;


const define = axios.create({
    baseURL: VITE_API_BASE_URL_PRE,
    timeout: import.meta.env.DEV ? 0 : 30000,
});

function transResponse(response) {
    return get(response, "data.data", {});
}

const service = defineService(define, { transResponse });

useTokenMiddleware(define);

export function useService() {
    return defineService(define, { transResponse });
}

export default service;
