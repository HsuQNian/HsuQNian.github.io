<script setup></script>
<template>
  <div id="feedback">
    <h2 id="title">使用过程中如遇到问题或有好的提议，欢迎在下方留言</h2>
    <Comment :width="'80%'" />
  </div>
</template>
<style scoped>
#feedback {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#title {
  text-align: center;
  margin-top: 20%;
  font-weight: 600;
  font-size: 24px;
  padding: 0 20px;
}
</style>
