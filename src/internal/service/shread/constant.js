/*
 * @FilePath: \51world\src\internal\service\shread\constant.js
 * @Author: maggot-code
 * @Date: 2022-12-04 00:51:38
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-12-21 14:42:31
 * @Description: 
 */
export const NormConfig = {
    url: "",
    method: "GET",
    params: {},
    data: {},
    headers: {},
}
export const NormResult = {
    code: -1,
    message: "ok",
    data: null
}

export const NormServiceProps = {
    transResponse: (response) => {
        return response;
    }
}
