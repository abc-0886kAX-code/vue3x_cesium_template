/*
 * @FilePath: \vue3x_cesium_template\src\permission.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-11-11 12:26:15
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-11-16 17:15:39
 * @Description:
 */
import { useRouter } from "@/router/useRouter";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { useUserStore } from "@/store/useUser";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist
const noNeedToken = ["/debug", "/singleLogin", "/404"]; // 不需要校验token的路由

const router = useRouter();

router.beforeEach(async (to, from, next) => {
    const user = useUserStore();


    // start progress bar
    NProgress.start();

    // set page title
    document.title = to.meta.title ?? "vue3x_cesium_template";

    if (
        noNeedToken.findIndex((item) => {
            return to.path.indexOf(item) !== -1;
        }) !== -1
    ) {
        // in the free login whitelist, go directly
        next();
        NProgress.done();
    } else {
        // determine whether the user has logged in
        if (user.tokenUsable) {
            if (to.path === "/login") {
                // if is logged in, redirect to the home page
                next({
                    path: "/",
                });
                NProgress.done();
            } else {
                next();
                NProgress.done();
            }
        } else {
            if (whiteList.indexOf(to.path) !== -1) {
                // in the free login whitelist, go directly
                next();
            } else {
                next("/login");
                NProgress.done();
            }
        }
    }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});
