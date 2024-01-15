/*
 * @FilePath: \vue3x_cesium_template-master\src\router\generator.js
 * @Author: abc-0886kAX-code
 * @Date: 2023-08-03 15:26:27
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-08-04 10:02:29
 * @Description: 待完善...
 */
const modules = import.meta.glob('../pages/*/*.vue', { eager: true })
const homeModules = import.meta.glob('../layout/*.vue', { eager: true })
function querysParse(querys) {
    const paramsList = querys.split('&');
    const params = {};

    paramsList.forEach(item => {
        const [field, value] = item.split('=');
        params[field] = value || ""
    });

    return params;
}
export const generator = (routerMap, parent) => {
    return routerMap.map(item => {
        // MODULE_NOT_FOUND
        const { title, hidden, icon } = item.meta || {};
        const currentRouter = {
            path: item.path,
            name: item.name,
            component: item.path === '/' || item.component === 'main-layout' ? homeModules[`../layout${item.component}.vue`].default : modules[`../pages${item.component}.vue`].default,
            meta: {
                title: title,
                icon: icon || undefined,
                permission: [],
            }
        }
        // 是否设置了隐藏菜单
        hidden && (currentRouter.meta.hidden = hidden)

        // 设置页面需要权限控制
        currentRouter.meta.power = true
        // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
        if (!currentRouter.path.startsWith('http')) {
            currentRouter.path = currentRouter.path.replace('//', '/')
        }

        item.redirect && (currentRouter.redirect = item.redirect)
        // 参数
        if (item.query) {
            currentRouter.meta.query = querysParse(item.query);
        }

        if (parent) {
            currentRouter.meta.parentName = parent.name;
        }

        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
            // 解决如果当前path是根路径拼到下一级出现双斜杠问题
            const itemPath = item.path === '/' ? '' : item.path;
            // 防止重定向的地址没有
            let path = item.children[0].path[0] === '/'
                ? (item.children[0].path)
                : (`${itemPath}/${item.children[0].path}`);

            currentRouter.redirect = path;
            // 防止重定向的地址没有
            currentRouter.children = generator(item.children, currentRouter)
        }
        return currentRouter
    })
}
