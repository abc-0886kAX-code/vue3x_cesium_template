<!--
 * @Author: abc-0886kAX-code
 * @Date: 2022-05-18 13:11:17
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-11-16 17:12:46
 * @Description:
-->
<script setup>

</script>

<template>
    <RouterView v-slot="{ Component }">
        <transition name="el-fade-in-linear">
            <component :is="Component" />
        </transition>
    </RouterView>
</template>

<style scoped lang='scss'>
</style>
