import { defineStore } from 'pinia'
// 判断白天还是晚上
import isDaytime from "@/utils/time.js";


export const useThemeStore = defineStore('theme', {
    state: () => {
        return {
            // 记录现在是白天还是晚上
            sun_or_moon: isDaytime(),  // true:就是太阳 false:就是月亮
        }
    },

    getters: {},

    actions: {
        
    },
})
