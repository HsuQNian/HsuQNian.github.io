<script setup>
const root = document.querySelector(":root");
let selectTheme = {
  dark: {
    "--Deep": "#120e10",
    "--Shallow": "#1e201e",
    "--theme": "#6ca984",
    "--Virtual": "#7a7b78",
    "--Real": "#ecedf2",
    "--Inverse": "#db5a6b",
  },
  light: {
    "--Deep": "#ecedf2",
    "--Shallow": "#f5f5f5",
    "--theme": "#db5a6b",
    "--Virtual": "#bbb",
    "--Real": "#120e10",
    "--Inverse": "#6ca984",
  },
};
const theme = () => {
  let theme = localStorage.getItem("theme");
  localStorage.setItem(
    "theme",
    theme != undefined && theme != "dark" ? "dark" : "light"
  );
  theme = localStorage.getItem("theme");
  for (const iterator in selectTheme[theme]) {
    root.style.setProperty(iterator, selectTheme[theme][iterator]);
  }
};
</script>
<template>
  <div class="header">
    <nuxt-link to="/">主页</nuxt-link>
    <nuxt-link to="/blog">博客</nuxt-link>
    <nuxt-link to="/project">项目</nuxt-link>
    <nuxt-link to="/friends">友链</nuxt-link>
    <nuxt-link to="/about">关于</nuxt-link>
    <div id="theme" @click="theme">
      <input type="checkbox" id="checkbox" />
    </div>
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 1%;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
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
  font-size: 16px;
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
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
}
input[type="checkbox"] {
  appearance: none;
  border-radius: 50%;
  outline: none;
  width: 24px;
  height: 24px;
  transition: all 0.8s;
  background: var(--theme);
}
input[type="checkbox"]:checked::before {
  transform: scale(1);
}
input[type="checkbox"]::before {
  transform-origin: top right;
  background: var(--Deep);
  width: 20px;
  height: 20px;
  transform: scale(0);
  content: "";
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
