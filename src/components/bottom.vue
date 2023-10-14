<template>
  <button
    @click="scroll_bottom"
    class="w-9 h-9 fixed bottom-6 left-5 p-1 text-base rounded-lg hover:bg-gray-300 hover:bg-opacity-50">
    <svg
      t="1697120382823"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="6278"
      width="24"
      height="24">
      <!--  2c2c2c e6e6e6 -->
      <path
        d="M524.736 548.256l181.248-181.248a51.264 51.264 0 1 1 72.48 72.512l-217.472 217.472a51.264 51.264 0 0 1-72.512 0L271.04 439.52a51.264 51.264 0 1 1 72.512-72.512l181.216 181.248z"
        :fill="themeStore.sun_or_moon ? '#2c2c2c' : '#e6e6e6'"
        p-id="6279"></path>
    </svg>
  </button>
</template>

<script setup>
// pinia 的主题仓库
import { useThemeStore } from "@/store/theme.js";
// 实例化 主题仓库
let themeStore = useThemeStore();

// 点击按钮滚动到页面的底部
const scroll_bottom = () => {
  // 将页面滚动到底部
  window.scroll({
    top: document.body.scrollHeight,
    behavior: "smooth", // 可以使滚动平滑
  });
};
</script>

<style scoped></style>
