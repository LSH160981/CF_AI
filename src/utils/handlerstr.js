/**
 * 用于处理字节流返回的数据
 * @param {String} str 
 * @returns String
 */
export const handlerStr = (str) => {
    // 一次性使用链式调用，避免多次声明变量
    let result_str = '';
    str.replace(/\s/g, '')       // 去除空格
        .replace(/\[DONE\]/g, '')  // 去除 [DONE]
        .replace(/data:/g, '\n')   // 将 data: 替换为换行符
        .split("\n")               // 按换行符分割字符串
        .filter(item => item.trim() !== '') // 去除空项
        .map(item => JSON.parse(item))     // 解析 JSON，并返回新数组
        .forEach((item) => {
            // console.log(item.choices[0].delta.content);
            if (item.choices[0].delta.content) {
                result_str += item.choices[0].delta.content
            }
        })
    return result_str
};








// 原版
// const handlerStr = (str) => {
//     let arrayStr = []
//     // console.log(str);
//     let modifiedStr = str.replace(/\s/g, '');
//     modifiedStr = modifiedStr.replace(/\[DONE\]/g, '');
//     modifiedStr = modifiedStr.replace(/data:/g, '\n');
//     let result = modifiedStr.split("\n");
//     // 使用 filter 方法过滤掉空项
//     result = result.filter((item) => {
//         // 返回 true 表示保留该项，false 表示排除该项
//         return item !== '';
//     });
//     result.forEach((item) => {
//         arrayStr.push(JSON.parse(item))
//     })
//     // console.log(arrayStr);
//     return arrayStr
// }