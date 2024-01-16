/*
 * @FilePath: \vue3x_cesium_template\src\service\request.js
 * @Author: abc-0886kAX-code
 * @Date: 2023-05-24 15:00:39
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-01-16 15:16:48
 * @Description:
 */
import { useUserStore } from "@/store/useUser";
import Axios from 'axios';

const user = useUserStore();

const baseURL = 'MHFish';

const request = Axios.create({
    //你的配置
    baseURL,
    timeout: 15000,
});

//请求拦截器
request.interceptors.request.use(
    config => {
        // 响应头指定了该响应的资源是否被允许与给定的origin共享 处理跨域问题  为什么要等于当前域名 不带清楚
        config.headers['Access-Control-Allow-ORigin'] = window.location.origin;

        //设置token 如果有token  在请求头中添加token
        if (user.tokenUsable) {
            config.headers['token'] = user.token;
        }
        //post请求  使用qs将数据格式化字符串    此条件可以再加 && isNil(config.notFormat)
        //此处隐藏是因为 mock 中的 getBody 接收数据无法转换 ， 可修改getBody方法 或 隐藏此处
        // if (config.method === 'post') {
        //     config.data = qs.stringify(config.data)
        //     console.log(config.data);
        // }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

//响应拦截器
request.interceptors.response.use(
    response => {
        const res = response.data;

        const { code, message } = res;

        if (code < 400) {
            return res;
        } else {
            ElMessage.error(message || '请联系管理员', 4);

            return Promise.reject(new Error(message || 'Error'));
        }

        //业务逻辑 400 500 200 404 等
    },
    error => {
        return Promise.reject(error);
    }
);

export const formData = data => {
    const formData = new FormData();

    for (const field in data) {
        formData.append(field, data[field]);
    }

    return formData;
};


export default request;
