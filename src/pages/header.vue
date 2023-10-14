<template>
  <div class="w-[100%] select-none">
    <div class="flex justify-between">
      <img src="@/assets/robot.svg" class="w-[48px] h-[48px]" />
      <div
        @click="iconHandler"
        class="w-[48px] h-[48px] flex justify-center items-center rounded-lg hover:bg-gray-300 hover:bg-opacity-50">
        <img
          :src="themeStore.sun_or_moon ? 'src/assets/sun.svg' : 'src/assets/moon.svg'"
          class="w-[30px] h-[30px]" />
      </div>
    </div>
    <div class="w-[100%] flex text-3xl mt-3">
      <div class="font-bold">ChatGPT</div>
      <div
        class="ml-3 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
        Demo
      </div>
    </div>
    <p class="opacity-50">Based on CloudFlare API.</p>
  </div>
</template>

<script setup>
// pinia 的主题仓库
import { useThemeStore } from "@/store/theme.js";
// 实例化 主题仓库
let themeStore = useThemeStore();

// 切换主题颜色
const iconHandler = () => {
  // 通过JavaScript选择HTML元素并添加class
  let htmlElement = document.querySelector("html");
  //  更改主题颜色、文字颜色
  if (themeStore.sun_or_moon) {
    // 原来是白天 change 晚上
    themeStore.sun_or_moon = false;
    htmlElement.classList.add("dark");
  } else {
    // 原来是晚上 change 白天
    themeStore.sun_or_moon = true;
    htmlElement.classList.remove("dark");
  }
};
</script>
