<template>
  <div class="header">
    <nuxt-link to="/">主页</nuxt-link>
    <nuxt-link to="/blog">博客</nuxt-link>
    <nuxt-link to="/project">项目</nuxt-link>
    <nuxt-link to="/friends">友链</nuxt-link>
    <nuxt-link to="/about">关于</nuxt-link>
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 1%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 12px;
  width: 99vw;
  height: 64px;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}
.header a {
  margin: 0 28px;
  color: var(--Virtual);
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: all 0.24s;
}
.header a:nth-child(1) {
  margin-left: 4%;
}
a.router-link-exact-active {
  color: var(--theme);
}
</style>
