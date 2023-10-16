import { defineStore } from 'pinia'
import axiosClient from "@/api/axiosClient.js";
import axios from 'axios';

// 第一个参数是你的应用中 Store 的唯一 ID。 
export const useMessageStore = defineStore('message', {
    state: () => {
        return {
            // 当前用户输入的内容
            currentMSG: "",
            // false:没有发起网络请求 | true:正在发起网络请求,不让用户继续输入内容
            is_AI_think: false,
            // 用于存储服务器返回的数据
            messages: []
        }
    },

    getters: {},

    actions: {
        // 通过 CF的API获取数据
        async get_msg_by_cf() {
            // console.log(this.currentMSG);
            this.messages.push({
                role: "user",
                content: this.currentMSG
            })

            // AI正在思考。 作用:不让用户连续输入文字
            this.is_AI_think = true

            // 发起网络请求获取数据
            await axiosClient.post(`/api/?content=${this.currentMSG}`).then((response) => {
                let result = response.data[0]
                // console.log(result);
                let tempStr = "";
                result.forEach(item => {
                    tempStr += item.content
                });
                // console.log(tempStr);
                this.messages.push({ role: "system", content: tempStr })
            }).catch((error) => {
                console.log(error.message);
            });
            // 将页面滚动到底部
            window.scroll({
                top: document.body.scrollHeight,
                behavior: 'smooth' // 可以使滚动平滑
            });
            // 恢复初始状态让，用户输入内容
            this.is_AI_think = false
        },
        async get_msg_by_llm() {
            // console.log(this.currentMSG);
            this.messages.push({
                role: "user",
                content: this.currentMSG
            })

            // AI正在思考。 作用:不让用户连续输入文字
            this.is_AI_think = true

            const OPENAI_API_KEY = 'sk-4fIOxiY8PDlxuqbNQvvPhZm4wtyEuiquroVpD1bT2jK2fZsA';
            const endpoint = "https://openkey.cloud/v1/chat/completions";
            const data = {
                // model: "gpt-3.5-turbo",
                model: "gpt-3.5-turbo-16k-0613",
                messages: [{ role: "user", content: this.currentMSG }],
                temperature: 0.7,
            };
            await axios.post(endpoint, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            }).then((response) => {
                let resultMSG = response.data.choices[0].message.content;
                this.messages.push({ role: "system", content: resultMSG })
            }).catch((error) => {
                console.error(error);
            });

            // 将页面滚动到底部
            window.scroll({
                top: document.body.scrollHeight,
                behavior: 'smooth' // 可以使滚动平滑
            });
            // 恢复初始状态让，用户输入内容
            this.is_AI_think = false
        },
        // 清除全部message
        clear_all_message() {
            this.messages = []
            this.is_AI_think = false
        }
    },
})
