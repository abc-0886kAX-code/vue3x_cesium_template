<script setup></script>

<template>
    <div class="empty-image">
        <slot></slot>
    </div>
</template>

<style scoped lang='scss'>
.empty-image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 0;
    overflow: hidden;

    & img {
        display: block;
        object-fit: contain;
    }
}
</style>
