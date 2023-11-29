/*
 * @FilePath: \明湖数字大厅\src\hooks\useDate.js
 * @Author: zhangxin
 * @Date: 2023-03-04 10:32:20
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-03-10 07:10:35
 * @Description:
 */
import dayjs from "dayjs";

const formatDate = "YYYY-MM-DD HH:mm:ss";

// 日期排序 state true 降序 false 升序
export function useDateSort(field, state = false) {
    return (prev, next) => {
        const prevDate = dayjs(prev[field]);
        const nextDate = dayjs(next[field]);
        if (prevDate.isBefore(nextDate)) {
            return state ? 1 : -1;
        } else if (prevDate.isAfter(nextDate)) {
            return state ? -1 : 1;
        } else {
            return 0;
        }
    };
}

export function useDate(startDate, endDate) {
    const range = shallowRef([dayjs(startDate).format(formatDate), dayjs(endDate).format(formatDate)]);

    return range;
}

export function useDateRain() {
    const now = dayjs();
    // 开始时间，当天8点，如果过了0点则昨天8点
    const start = now.hour() >= 8 ? now.hour(8).minute(0).second(0) : now.hour(8).minute(0).second(0).add(-1, "day");
    // 结束时间，第二天8点，如果过了0点则当天8点
    const end = now.hour() >= 8 ? now.hour(8).minute(0).second(0).add(1, "day") : now.hour(8).minute(0).second(0);
    return useDate(start, end);
}

export function useDateWater() {
    const now = dayjs();
    // 开始时间，当天0点
    const start = now.hour(0).minute(0).second(0);
    // 结束时间，第二天0点
    const end = now.hour(0).minute(0).second(0).add(1, "day");
    return useDate(start, end);
}

export function useDateScope(sh, eh) {
    const now = dayjs();
    // 开始时间，当天的sh点
    const start = now.hour(sh).minute(0).second(0);
    // 结束时间，第二天的eh点
    const end = now.hour(eh).minute(0).second(0).add(1, "day");
    return useDate(start, end);
}

export function useDateBefore(eh) {
    const now = dayjs();
    // 开始时间，当前时间的小时数减去eh小时
    const start = now
        .hour(now.hour() - eh)
        .minute(0)
        .second(0);
    // 结束时间，当前时间的小时数
    const end = now.hour(now.hour()).minute(0).second(0);
    return useDate(start, end);
}

//取当前到当前小时数减去eh小时包含当前分钟
export function useDateContainmmBefore(eh) {
    const now = dayjs();
    // 开始时间，当前时间的小时数减去eh小时
    const start = now
        .hour(now.hour() - eh)
        .minute(0)
        .second(0);
    // 结束时间，当前时间的小时数
    const end = now.hour(now.hour()).second(0);
    console.log(end);
    return useDate(start, end);
}

export default useDate;
