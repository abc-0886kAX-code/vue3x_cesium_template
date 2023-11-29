# popup

```vue
<script setup>
import { useDialog } from "@/domain/Popup/usecase/useDialog";
const props = defineProps({
    popupKeyword: {
        type: String,
        default: ""
    },
});
const dialog = useDialog(props.popupKeyword);
function setupTitle() {
    dialog.setupTitle("AAA");
}
function setupWidth() {
    dialog.setupSize({
        width: "80%"
    });
}
function setupHeight() {
    dialog.setupSize({
        height: "300px"
    });
}
</script>

<template>
    <div>
        <!-- <h1>{{ id }}</h1> -->
        <el-button-group>
            <el-button @click="dialog.destroy">销毁</el-button>
            <el-button @click="dialog.hide">关闭</el-button>
            <el-button @click="setupTitle">设置标题</el-button>
            <el-button @click="setupWidth">改变宽度</el-button>
            <el-button @click="setupHeight">改变高度</el-button>
        </el-button-group>
    </div>
</template>

<style scoped lang='scss'>

</style>
```
