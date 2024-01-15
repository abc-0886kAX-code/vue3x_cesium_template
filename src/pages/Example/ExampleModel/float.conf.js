/*
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExampleModel\float.conf.js
 * @Author: abc-0886kAX-code
 * @Date: 2023-12-05 15:54:23
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-12-11 17:29:02
 * @Description:
 */
const floatColumn = [
    {
        prop: "author",
        label: "作者",
    },
    {
        prop: "date",
        label: "创建时间",
    },
    {
        prop: "tileCount",
        label: "数量",
    },
];

export const setupFloat = (attr) => {
    return floatColumn.map((item) => {
        const { label, prop: field } = item;

        return {
            label,
            field,
            text: attr[field],
        };
    });
};
