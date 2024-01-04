<template>
  <div class="flex justify-center overflow-y-auto">
    <!-- 设计版心以及 对应的两套css -->
    <div class="w-1/2 max-w-2xl px-8 py-12 maxd:w-screen">
      <Header class="mb-6"></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  </div>
  <Bottom></Bottom>
</template>

<script setup>
import Header from "./pages/header.vue";
import Main from "./pages/main.vue";
import Footer from "./pages/footer.vue";
import Bottom from "./components/bottom.vue";
import { onMounted } from "vue";

// pinia 的主题仓库
import { useThemeStore } from "@/store/theme.js";
// 实例化 主题仓库
let themeStore = useThemeStore();

onMounted(() => {
  // 通过JavaScript选择HTML元素并添加class
  let htmlElement = document.querySelector("html");
  //  更改主题颜色、文字颜色
  if (themeStore.sun_or_moon) {
    // 白天
    htmlElement.classList.remove("dark");
  } else {
    // 晚上
    htmlElement.classList.add("dark");
  }
});
</script>
