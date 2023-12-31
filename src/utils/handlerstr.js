/**
 * 用于处理字节流返回的数据
 * @param {String} str 
 * @returns String
 */
export const handlerStr = (str) => {
    let result_str = '';
    str.replace(/("[^"]*")|\s/g, (_, capture) => {
        // 如果匹配到双引号内的内容，则保留原样，否则删除空格
        return capture ? capture : '';
    })
        .replace(/\[DONE\]/g, '')  // 去除 [DONE]
        .replace(/data:/g, '\n')   // 将 data: 替换为换行符
        .split("\n")               // 按换行符分割字符串
        .filter(Boolean)           // 去除空项
        .map(item => JSON.parse(item))     // 解析 JSON，并返回新数组
        .forEach((item) => {
            if (item.choices[0].delta.content) {
                result_str += item.choices[0].delta.content;
            }
        });
    // 这一部分 有关页面滚动 有待商榷，是留还是删除，看情况
    window.scroll({
        top: document.body.scrollHeight,
        behavior: "smooth", // 可以使滚动平滑
    });

    return result_str;
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