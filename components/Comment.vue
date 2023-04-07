<script setup>
import "giscus";
const app = defineProps({
  width: String,
});
</script>
<template>
  <div class="comments-container">
    <giscus-widget
      repo="HsuQNian/HsuQNian.github.io"
      repoid="R_kgDOJRfHVg"
      category="Announcements"
      category-id="DIC_kwDOJRfHVs4CVnN2"
      mapping="pathname"
      strict="0"
      reactionsenabled="1"
      emitmetadata="0"
      inputposition="top"
      theme="preferred_color_scheme"
      lang="zh-CN"
      crossorigin="anonymous"
      async
    ></giscus-widget>
  </div>
</template>
<style scoped>
giscus-widget {
  min-width: 200px;
  max-width: v-bind("app.width");
}
.comments-container {
  width: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
}
</style>
