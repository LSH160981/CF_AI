/**
 *   要根据用户的时间来判断是白天还是晚上
 */

function isDaytime() {
    const now = new Date();
    const currentHour = now.getHours();
    // console.log(currentHour);

    // 定义白天的时间范围，这里假设早上6点到晚上18点是白天
    const morningStart = 6;
    const eveningEnd = 18;

    // 判断当前时间是否在白天范围内
    if (currentHour >= morningStart && currentHour < eveningEnd) {
        // 白天
        return true;
    } else {
        // 晚上
        return false;
    }
}

export default isDaytime
