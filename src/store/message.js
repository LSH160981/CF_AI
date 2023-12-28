import { defineStore } from 'pinia'
import axiosClient from "@/api/axiosClient.js";
import { handlerStr } from '@/utils/handlerstr.js';

// 第一个参数是你的应用中 Store 的唯一 ID。 
export const useMessageStore = defineStore('message', {
    state: () => {
        return {
            // 当前用户输入的内容
            currentMSG: "",
            // false:没有发起网络请求 | true:正在发起网络请求,不让用户继续输入内容
            is_AI_think: false,
            // 获取动态的API_KEY
            AI_API_KEY: "",
            // token余额
            Remaining_API_KEY: "",
            // 错误的信息
            errorMSG: "",
            // 用于存储服务器返回的数据
            messages: []
        }
    },

    getters: {},

    actions: {
        // 通过 CF的API获取数据
        // async get_msg_by_cf() {
        //     // console.log(this.currentMSG);
        //     this.messages.push({
        //         role: "user",
        //         content: this.currentMSG
        //     })

        //     // AI正在思考。 作用:不让用户连续输入文字
        //     this.is_AI_think = true

        //     // 发起网络请求获取数据
        //     await axiosClient.post(`/api/?content=${this.currentMSG}`).then((response) => {
        //         let result = response.data[0]
        //         // console.log(result);
        //         let tempStr = "";
        //         result.forEach(item => {
        //             tempStr += item.content
        //         });
        //         // console.log(tempStr);
        //         this.messages.push({ role: "system", content: tempStr })
        //     }).catch((error) => {
        //         console.log(error.message);
        //     });
        //     // 将页面滚动到底部
        //     window.scroll({
        //         top: document.body.scrollHeight,
        //         behavior: 'smooth' // 可以使滚动平滑
        //     });
        //     // 恢复初始状态让，用户输入内容
        //     this.is_AI_think = false
        // },
        async get_msg_by_llm() {
            // AI正在思考。 作用:不让用户连续输入文字
            this.is_AI_think = true

            // console.log(this.messages);
            this.messages.push({
                role: "user",
                content: this.currentMSG
            })

            const apiUrl = "https://openkey.cloud/v1/chat/completions";
            // 创建消息体
            const requestBody = {
                model: 'gpt-4-1106-preview',
                messages: this.messages,
                stream: true, // 开启流式读取
            };
            // console.log(this.AI_API_KEY);
            // 创建Fetch请求配置
            const fetchOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.AI_API_KEY}`,
                },
                body: JSON.stringify(requestBody),
            };
            // 发起Fetch请求
            let response = await fetch(apiUrl, fetchOptions)
            if (!response.ok) {
                if (response.status === 401) {
                    this.errorMSG = "API密钥无效";
                    return
                }
                this.errorMSG = "请求出错啦！";
                return
            }

            // 添加一个空的
            this.messages.push({ role: "system", content: "" })
            // 流式读取
            let reader = response.body.getReader();
            let decoder = new TextDecoder();
            while (1) {
                let { done, value } = await reader.read();
                if (done) { break; }
                let content = decoder.decode(value);
                // console.log(handlerStr(content));
                this.messages[this.messages.length - 1].content += handlerStr(content)
            }

            // 恢复初始状态让，用户输入内容
            this.is_AI_think = false
            // 查询token余额
            this.check_Remaining_API_KEY();
        },
        // 清除全部message
        clear_all_message() {
            this.messages = []
            this.is_AI_think = false
        },
        // 获取动态的API_KEY
        async getKeyByGithub() {
            await axiosClient.get('https://raw.githubusercontent.com/LSH160981/CF_Worker/main/key.txt')
                .then((response) => {
                    // console.log(response);
                    this.AI_API_KEY = response.trim();
                    // 查询token余额
                    this.check_Remaining_API_KEY(this.AI_API_KEY);
                })
        },
        // 查询token余额[异步]
        check_Remaining_API_KEY(API_KEY = this.AI_API_KEY) {
            // { Remaining: 0.796, Status: 1, Total: 1, Used: 0.204 }
            // { Error: '查询失败，API Key已失效或不存在', Status: 0 }
            // { Error: '查询失败，API Key为空', Status: 0 }
            let apiUrl = `https://proxy-key-remaining.proxyai.workers.dev/?token=${API_KEY}`;
            axiosClient.get(apiUrl)
                .then(response => {
                    if (response.Status == 1) {
                        // console.log('Token response:', response.Remaining);
                        this.Remaining_API_KEY = response.Remaining
                    } else if (response.Status == 0) {
                        this.errorMSG = response.Error
                    }
                })
        }
    },
})
