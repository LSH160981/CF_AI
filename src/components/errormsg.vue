<template>
  <div class="w-5/6 fixed top-7 left-1/2 -translate-x-1/2 flex justify-center text-center">
    <transition name="fade">
      <div
        v-if="show"
        class="max-w-[100%] w-2/6 h-12 bg-red-500 bg-opacity-80 rounded-3xl 
        flex justify-center items-center flex-nowrap maxd:w-5/6">
        <span class="truncate text-xl mx-3">{{ errortitle || "发生错误！" }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

//子组件接收父组件传递过来的值
defineProps(["errortitle"]);
let show = ref(false);
// 监视传输进来的数据
onMounted(() => {
  show.value = true;
});
</script>
<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scaleX(0);
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
  opacity: 1;
  transform: scaleX(1);
}
</style>
