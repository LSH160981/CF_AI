<template>
  <!-- 错误信息提示组件 -->
  <Errormsg v-if="show_error_CV" :errortitle="errortitle"></Errormsg>
  <!-- 输入框 发送按钮 清除按钮 -->
  <!-- v-if与下面的遮罩层 互斥 -->
  <div class="gen-text-wrapper select-none" v-if="!MessageStore.is_AI_think">
    <!-- autofocus -->
    <textarea
      placeholder="Enter something..."
      autocomplete="off"
      rows="1"
      v-model="send_input"
      @keydown="input_keydown"
      class="gen-textarea"></textarea>
    <button gen-slate-btn @click="sendHandler" :disabled="send_input == ''">Send</button>
    <button gen-slate-btn @click="broomHandler">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <!--  2c2c2c e6e6e6 -->
        <path
          :fill="themeStore.sun_or_moon ? '#2c2c2c' : '#e6e6e6'"
          d="M8 20v-5h2v5h9v-7H5v7h3zm-4-9h16V8h-6V4h-4v4H4v3zM3 21v-8H2V7a1 1 0 0 1 1-1h5V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3h5a1 1 0 0 1 1 1v6h-1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"></path>
      </svg>
    </button>
  </div>
  <!-- 当发起了网络请求 不让用户继续输入 -->
  <div
    v-else
    class="gen-text-wrapper bg-gray-400 rounded"
    :class="{ 'bg-opacity-30': themeStore.sun_or_moon ? true : false }">
    <span class="h-12 leading-[3rem] select-none">CF AI is thinking...</span>
  </div>
  <!-- 个人的信息导航 | 源代码的出处 -->
  <p class="mt-8 text-xs opacity-40 select-none">
    <span class="pr-1">Made by</span>
    <a href="https://github.com/LSH160981/CF_AI" target="_blank"> XiaoLiao </a>
    <span class="px-1">|</span>
    <a href="https://github.com/ddiu8081/chatgpt-demo" target="_blank"> Source Code </a>
    <span class="px-1">| </span>
    <span>{{ MessageStore.Remaining_API_KEY }}</span>
  </p>
</template>

<script setup>
import { ref, watch } from "vue";
// 错误信息提示的组件
import Errormsg from "@/components/errormsg.vue";
// pinia 的信息仓库
import { useMessageStore } from "@/store/message.js";
// 实例化 信息仓库
let MessageStore = useMessageStore();
// pinia 的主题仓库
import { useThemeStore } from "@/store/theme.js";
// 实例化 主题仓库
let themeStore = useThemeStore();

// textarea 的内容(双向绑定)
let send_input = ref("");
// 错误提示的文字。用于给Errormsg组件传参
let errortitle = ref("");
// 是否展示 错误 提示信息的CV组件
let show_error_CV = ref(false);

// 点击发送按钮的回调
const sendHandler = () => {
  // 判断输入框的内容是否合法
  if (send_input.value.trim() == "") {
    send_input.value = ""; // 置空输入框
    ctrl_error_CV("请输入内容!");
    return;
  }
  // 更改 信息仓库 的status 内容
  MessageStore.currentMSG = send_input.value;
  // 通知仓库获取数据
  // MessageStore.get_msg_by_cf();
  MessageStore.get_msg_by_llm();
  send_input.value = ""; // 置空输入框
};
// 小扫把按钮 回调
const broomHandler = () => {
  // 通知 信息仓库 清除全部message
  MessageStore.clear_all_message();
};

// 输入框  回车  触发事件
const input_keydown = (even) => {
  if (even.keyCode == 13) {
    // 点击发送按钮的回调
    sendHandler();
    // 回车后 主动 失去焦点
    even.target.blur();
  }
};

// 对错误提示组件的控制
const ctrl_error_CV = (errMsg) => {
  // 启动错误提示组件
  show_error_CV.value = true;
  // 错误的提示信息
  errortitle.value = errMsg;
  // 3.5秒后 销毁 错误提示组件
  setTimeout(() => {
    show_error_CV.value = false;
  }, 3500);
};

// MessageStore.errorMSG,是axios返回的错误信息，本来是空的，一旦发生变化就启用【错误提示组件】
watch(
  () => MessageStore.errorMSG,
  (newValue) => {
    // console.log(newValue);
    // 如果错误信息为空，不要启用错误提示组件
    if (MessageStore.errorMSG == "") {
      return;
    } else {
      ctrl_error_CV(newValue);
      // 提示:这里的 赋值 同样会触发watch
      MessageStore.errorMSG = "";
    }
  }
);
</script>

<style scoped>
.gen-text-wrapper {
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  grid-gap: 0.5rem;
  gap: 0.5rem;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
}
.gen-textarea {
  width: 100%;
  min-height: 3rem;
  max-height: 9rem;
  resize: none;
  scroll-padding: 8px;
  border-radius: 0.125rem;
  --un-bg-opacity: 1;
  background-color: rgba(148, 163, 184, var(--un-bg-opacity));
  --un-bg-opacity: 0.15;
  padding: 0.75rem;
}
[gen-slate-btn=""] {
  height: 3rem;
  border-radius: 0.125rem;
  --un-bg-opacity: 1;
  background-color: rgba(148, 163, 184, var(--un-bg-opacity));
  --un-bg-opacity: 0.15;
  padding: 0.5rem 1rem;
}
</style>
