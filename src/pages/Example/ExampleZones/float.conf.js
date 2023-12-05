const floatColumn = [
    {
        prop: "NAME",
        label: "名称",
    },
    {
        prop: "名称",
        label: "流域",
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
