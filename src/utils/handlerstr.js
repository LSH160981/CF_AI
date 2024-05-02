/**
 * 用于处理字节流返回的数据
 * @param {String} str 
 * @returns String
 */
export const handlerStr = (str) => {
    let result_str = '';
    const regex = /{"content":"(.*?)"}/g;
    const matches = [...str.matchAll(regex)];
    // 取捕获组的值 
    matches.map(match => {
        result_str += JSON.parse(match[0]).content
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