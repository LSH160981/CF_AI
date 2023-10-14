// tailwindcss
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// 预览组件以及样式
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// VuePress主题以及样式（这里也可以选择github主题）
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// 快速复制代码
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
// markdown支持显示代码行数
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';

// Prism
import Prism from 'prismjs';
// 代码高亮
import 'prismjs/components/prism-json';
// 选择使用主题
VMdPreview.use(vuepressTheme, {
    Prism,
});
// 鼠标放置在代码区域，会出现复制按钮：
VMdPreview.use(createCopyCodePlugin());

// 引入pinia
import { createPinia } from 'pinia'
const app = createApp(App)
// markdown支持显示代码行数
VMdPreview.use(createLineNumbertPlugin())
// use pinia插件
app.use(createPinia())
// use v-md-editor预览组件
app.use(VMdPreview);
app.mount('#app')