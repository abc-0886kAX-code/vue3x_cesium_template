/*
 * @FilePath: \数字大厅\src\middleware\token.request.js
 * @Author: maggot-code
 * @Date: 2022-11-01 10:42:20
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-03-21 17:34:38
 * @Description:
 */
import { uuid } from "@/shared/uuid.js";
import { useRouter } from "@/router/useRouter";
import { useUserStore } from "@/store/useUser";
import { MessageBox, Message } from "element-ui";
const user = useUserStore();
const router = useRouter();

function normal(config) {
    if (user.tokenUnusable) return config;

    config.headers["Authorization"] = `Bearer ${uuid()}`;
    config.headers["token"] = user.token;

    return config;
}

function response(response) {
    const res = response.data;
    if (res.code != 200) {
        if (res.code == 203) {
            MessageBox.confirm(res.msg, "提示", {
                type: "warning",
                showCancelButton: false,
                confirmButtonText: "确定",
            }).then(() => {
                user.emptyUserInfo();
                setTimeout(() => {
                    router.push("/login");
                }, 1000);
            });
        } else {
            Message({
                message: res.msg || "请求出错，请重试",
                type: "error",
                duration: 1500,
                onClose: () => {},
            });
        }
        return Promise.reject(new Error(res.msg || "Error"));
    } else {
        return res;
    }
}

export function useTokenMiddleware(define) {
    define.interceptors.request.use(normal);
    // define.interceptors.response.use(response);

    return define;
}

export default useTokenMiddleware;
