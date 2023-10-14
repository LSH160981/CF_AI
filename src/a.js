import { Ai } from './vendor/@cloudflare/ai.js';

export default {
    async fetch(request, env) {
        async function get_msg_by_ai(MSG) {
            let result = await ai.run('@cf/meta/llama-2-7b-chat-int8', MSG);
            return { role: 'system', content: result.response }
        }
        // 获取用户对的访问全部的URL
        const url = new URL(request.url);

        const tasks = [];
        const ai = new Ai(env.AI);
        let response;
        let chat = {
            messages: [
                // { role: 'system', content: '你是一个有好的中文助手' },
            ]
        };
        let userContent = url.searchParams.get('content');
        let temp = { role: 'user', content: userContent }
        chat.messages.push(temp);
        response = await get_msg_by_ai(chat)
        chat.messages.push(response);
        chat.messages.push({ role: "user", content: response.content });
        response = await get_msg_by_ai(chat)
        chat.messages.push(response);



        tasks.push(chat);

        return Response.json(tasks);
    }

};
