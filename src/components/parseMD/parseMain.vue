<template>
  <!-- 在main.js v-md-preview 已经是全局组件 -->
  <!-- 如果是用户的提问 直接展示 -->
  <!-- 如果是返回的结果，就要一点点的展示 -->
  <v-md-preview v-if="props.MSG.role == 'user'" :text="props.MSG.content"></v-md-preview>
  <v-md-preview v-else-if="props.MSG.role == 'system'" :text="outputTypeText"></v-md-preview>
</template>

<script setup>
import { ref, watch } from "vue";

//子组件接收父组件传递过来的值
const props = defineProps({
  MSG: Object,
});

// 通过ref属性监听效果实现 逐步输出
let outputTypeText = ref("");

// 逐步输出主函数
const typeText = (msgContent) => {
  let index = 0;
  const delay = 15; // 输出速度（每毫秒的字符数）

  // 开启定时器，并做好标识
  const typingInterval = setInterval(() => {
    // 通过字符长度判断是否输出完毕
    if (index < msgContent.length) {
      // 通过字符串的提取[charAt(index)] 再 拼接 ;实现内容逐步输出
      outputTypeText.value += msgContent.charAt(index);
      index++;
    } else {
      // 进入这里  outputTypeText 与 msgContent 的内容相同
      // 清除定时器
      clearInterval(typingInterval);
    }
  }, delay);
};
// 监视传输进来的数据
watch(
  () => props.MSG,
  () => {
    // 优化代码
    if (props.MSG.role == "system") {
      typeText(props.MSG.content);
    }
    return;
  },
  // 深度监视    组件加载完毕立即执行一次
  { deep: true, immediate: true }
);
</script>
