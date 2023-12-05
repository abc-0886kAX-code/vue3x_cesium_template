const floatColumn = [
    {
        prop: "stnm",
        label: "名称",
    },
    {
        prop: "addvcdname",
        label: "区域",
    },
    {
        prop: "stlc",
        label: "详细地址",
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
