/*
 * @FilePath: \vue3x_cesium_template-master\src\api\user.js
 * @Author: abc-0886kAX-code
 * @Date: 2023-05-24 15:07:15
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-08-04 10:13:23
 * @Description:
 */
import request, { formData } from '@/service/request';

// 明湖钓台获取登录接口
export const login = data => {
    return request({
        url: `/QrWater/PublicMind/FeedBack/getFeedbackAnswerList`,
        method: 'POST',
        data: formData(data),
    });
};
