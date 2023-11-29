<!--
 * @FilePath: \vue3x_template\src\pages\NotPage\404.vue
 * @Author: maggot-code
 * @Date: 2022-11-21 15:16:40
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-05 17:05:27
 * @Description:
-->
<script setup>
const { proxy } = getCurrentInstance();
function gobackHome() {
    proxy.$router.push({ name: "home" });
}
</script>

<template>
    <div class="not-page">
        <img src="https://element-plus-admin.cn/assets/404-1759fece.svg" alt="" />
        <div class="not-page-text">抱歉，您访问的页面不存在。</div>
        <div class="not-page-btn">
            <el-button size="mini" type="primary" @click="gobackHome">返回首页</el-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.not-page {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;

    &-text {
        color: #909399;
        font-size: 14px;
    }

    &-btn {
        margin-top: 20px;
    }
}

img {
    width: 350px;
}
</style>
