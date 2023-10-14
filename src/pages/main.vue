<template>
  <div class="py-2 -mx-4 px-4 transition-colors rounded-2xl hover:bg-gray-400 hover:bg-opacity-5">
    <ParseMarkdown></ParseMarkdown>
  </div>
</template>

<script setup>
// 引用 markdowm 解析组件
import ParseMarkdown from "@/components/parseMarkdown.vue";
</script>
