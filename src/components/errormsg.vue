<template>
  <div
    name="fade"
    class="md:max-w-[33.3%] h-16 bg-red-500 bg-opacity-80 rounded-3xl flex justify-start items-center flex-nowrap fixed top-7 left-1/2 -translate-x-1/2
    maxd:w-5/6">
    <img src="@/assets/error.svg" class="w-[45px] h-[45px] mx-3" />
    <span class="truncate text-xl mr-3">{{ errortitle || "发生错误！" }}</span>
  </div>
</template>

<script setup>
//子组件接收父组件传递过来的值
defineProps(["errortitle"]);
</script>
<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
