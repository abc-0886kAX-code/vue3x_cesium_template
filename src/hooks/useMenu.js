/*
 * @FilePath: \vue3x_cesium_template-master\src\hooks\useMenu.js
 * @Author: abc-0886kAX-code
 * @Date: 2023-08-03 15:01:33
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-08-03 18:29:20
 * @Description:
 */

export function useMenu() {
    const menu = ref([]);
    function setupMenu(list) {
        menu.value = list;
    }
    function renderSubmenu(cell) {
        const { meta } = cell;
        if (meta?.hidden === 'false') return false;
        return cell.children && cell.children.length > 0;
    }
    function renderMenu(cell) {
        const { meta } = cell;
        return meta?.hidden === 'true';
    }
    function getIcon(cell) {
        const { meta } = cell;
        const { icon } = meta;
        return icon ? icon : "el-icon-location";
    }
    function getTitle(cell) {
        const { meta, name } = cell;
        const { title } = meta;
        return title ? title : name;
    }
    return {
        menuMap: menu,
        setupMenu,
        renderSubmenu,
        renderMenu,
        getIcon,
        getTitle
    }
};
export default useMenu;
