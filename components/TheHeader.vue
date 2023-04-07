<template>
  <div class="header">
    <nuxt-link to="/">主页</nuxt-link>
    <nuxt-link to="/blog">博客</nuxt-link>
    <nuxt-link to="/project">项目</nuxt-link>
    <nuxt-link to="/friend">友链</nuxt-link>
    <nuxt-link to="/about">关于</nuxt-link>
    <!-- <input type="checkbox" id="theme" /> -->
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
#theme {
  justify-self: flex-end;
}
input[type="checkbox"] {
  appearance: none;
  border-radius: 2px;
  background: var(--Deep);
  outline: none;
  width: 44px;
  height: 24px;
  position: relative;
  border-radius: 4px;
  border: 1px solid var(--Real);
  transition: all 0.8s;
}
input[type="checkbox"]:checked::before {
  transform: translateX(20px);
}
input[type="checkbox"]::before {
  content: "";
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: var(--theme);
  position: absolute;
  left: 2px;
  top: 3px;
  transition: transform 0.8s, background 0.8s;
}
</style>
