/*
 * @FilePath: \明湖数字大厅\src\store\useProgressMask.js
 * @Author: zhangxin
 * @Date: 2023-03-12 00:25:16
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-03-12 01:20:08
 * @Description:
 */
import { defineStore } from "pinia";
import { transNumber, transString } from "~/shared/trans";

function setupLimit() {
    // 随机返回一个 80 ~ 90 的数字
    return Math.floor(Math.random() * 10 + 80);
}

const paths = [];

export const Namespace = "useProgressMask";

export const useProgressMask = defineStore(Namespace, {
    state: () => ({
        limit: setupLimit(),
        percentage: 0,
        active: false,
        tips: "请稍后..",
    }),

    getters: {
        desc() {
            return `${this.tips} (${this.percentage}%)`;
        },
        wait() {
            return this.percentage >= this.limit;
        },
        meet() {
            return this.percentage >= 100;
        },
        unmeet() {
            return !this.meet;
        },
    },

    actions: {
        setupTips(value) {
            this.tips = transString(value, "请稍后..");
        },
        setupActive(value) {
            this.limit = setupLimit();
            this.active = value;

            if (!this.active) this.$reset();
        },
        setupPercentage(value) {
            const val = Math.floor(transNumber(value));
            this.percentage = val <= 0 ? 0 : val >= 100 ? 100 : val;
        },
        toAutoGrow() {
            if (this.percentage <= this.limit) {
                // 随机增加 2 ~ 6 的小数
                const add = Math.random() * 4 + 2;
                this.setupPercentage(this.percentage + add);
            }
        },
        // 完成
        toComplete() {
            this.setupPercentage(100);
        },
    },

    persist: {
        key: Namespace,
        paths,
    },
});

export default {
    namespace: Namespace,
    store: useProgressMask,
};
