<!--
 * @FilePath: \明湖数字大厅\src\components\EmptyView.vue
 * @Author: maggot-code
 * @Date: 2022-11-26 16:03:34
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-03-02 15:59:48
 * @Description:
-->
<script setup>
const props = defineProps({
    desc: {
        type: String,
        default: "抱歉，访问资源不存在",
    },
});
</script>

<template>
    <el-empty class="furnace-empty" :description="desc"></el-empty>
</template>

<style scoped lang="scss"></style>
