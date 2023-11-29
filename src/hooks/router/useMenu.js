/*
 * @FilePath: \明湖大屏\src\hooks\router\useMenu.js
 * @Author: zhangxin
 * @Date: 2023-01-30 15:49:15
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-01-30 17:50:04
 * @Description:
 */
import { getCurrentInstance } from "vue";

export function useFirstRoute() {
    const { proxy } = getCurrentInstance();

    return computed(() => {
        const state = proxy.$route.matched.length >= 2;
        const store = state ? proxy.$route.matched[1] : null;
        return { state, store };
    });
}

export function useMenu() {
    const { proxy } = getCurrentInstance();
    const route = useFirstRoute();
    const source = computed(() => {
        if (!unref(route).state) return [];

        const routes = proxy.$router.getRoutes();

        if (unref(route).store.meta.navstate.main) {
            return routes.filter((item) => !item.meta.navstate.main && item.meta.navstate.second);
        } else {
            return routes.filter((item) => {
                return eq(item?.parent?.name, unref(route).store.name);
            });
        }
    });

    return source;
}

export function useMenuTitle() {
    const route = useFirstRoute();
    const title = computed(() => {
        if (!unref(route).state) return "明湖数字平台";

        return unref(route).store.meta.title;
    });

    return title;
}

export function useMenuNav() {
    const { proxy } = getCurrentInstance();
    const route = useFirstRoute();
    const source = computed(() => {
        if (!unref(route).state || !unref(route).store.meta.navstate.main) return [];

        return proxy.$router.getRoutes().filter((item) => {
            return eq(item?.parent?.name, unref(route).store.name);
        });
    });

    return source;
}

export function useMenuTohome() {
    const { proxy } = getCurrentInstance();
    const route = useFirstRoute();
    const visableTohome = computed(() => {
        if (!unref(route).state) return false;

        return !unref(route).store.meta.navstate.main && unref(route).store.meta.navstate.second;
    });
    function tohome() {
        proxy.$router.push({ name: "home" });
    }

    return {
        visableTohome,
        tohome,
    };
}

export function useMenuActive(name) {
    const { proxy } = getCurrentInstance();
    function eqActive(route) {
        return eq(route.name, proxy.$route.name) ? [name] : [];
    }
    const className = computed(() => eqActive);

    return className;
}
