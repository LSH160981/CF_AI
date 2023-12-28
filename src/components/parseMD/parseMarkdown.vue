<template>
  <!-- v-for遍历 信息仓库 数据 -->
  <div
    class="flex gap-3 rounded-lg border-b-2 border-b-gray-300"
    v-for="(item, index) in MessageStore.messages"
    :key="index">
    <!-- 动态的class区分(用户|系统)的头像 -->
    <div class="shrink-0 my-5 w-7 h-7 rounded-full" :class="user_or_system(item.role)"></div>
    <!-- (用户的提问|系统的回复)展示 -->
    <div class="message break-words overflow-hidden">
      <p class="py-5">
        <v-md-preview :text="item.content"></v-md-preview>
      </p>
    </div>
  </div>
</template>

<script setup> 
// pinia 的信息仓库
import { useMessageStore } from "@/store/message.js";
// 实例化 信息仓库
let MessageStore = useMessageStore();

// 根据仓库的信息判断是(用户的提问|系统的回复)
// 添加不同的 tailwindcss 样式
const user_or_system = (role) => {
  if (role == "user") {
    return "bg-gradient-to-r from-purple-400 to-yellow-400";
  } else if (role == "system") {
    return "bg-gradient-to-r from-yellow-200 via-green-200 to-green-300";
  }
};
</script>

<style scoped></style>
