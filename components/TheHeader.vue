<script setup>
import { Store } from "../store/index.js";
const store = Store();
</script>
<template>
  <div class="header">
    <nuxt-link to="/">主页</nuxt-link>
    <nuxt-link to="/blog">博客</nuxt-link>
    <nuxt-link to="/project">项目</nuxt-link>
    <nuxt-link to="/friends">友链</nuxt-link>
    <nuxt-link to="/about">关于</nuxt-link>
  </div>
  <div
    id="Music"
    @click="
      () => {
        store.MusicDisplay = !store.MusicDisplay;
        if (store.MusicListShow) store.MusicListShow = false;
      }
    "
  >
    <div
      id="disc"
      :style="{
        AnimationPlayState: store.MusicPlaying ? 'running' : 'paused',
      }"
    >
      <div
        v-for="index in 10"
        :style="{
          width: `${30 - index * 2}px`,
          height: `${30 - index * 2}px`,
          transform: `translate(-50%, -50%) rotate(${
            index % 2 == 0 ? index : -index * 20
          }deg)`,
        }"
      />
    </div>
    <div
      id="Crank"
      :style="{
        transform: store.MusicPlaying
          ? 'translateX(-50%) rotate(-30deg)'
          : 'translateX(-50%) rotate(-60deg)',
      }"
    >
      <div v-for="index in 3" />
    </div>
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
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  transition: all 0.24s;
}
.header a {
  margin: 0 28px;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: all 0.24s;
  color: var(--Virtual);
}
.header a:nth-child(1) {
  margin-left: 4%;
}
a.router-link-exact-active {
  color: var(--theme);
}
#Music {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-left: auto;
  position: relative;
  background: var(--Real);
  position: fixed;
  right: 20px;
  top: calc(1% + 16px);
  z-index: 1001;
}
#disc {
  animation: rotate 8s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg);
}
#disc > div {
  position: absolute;
  border-radius: 50%;
  border: 0.1px solid #888;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg);
  border-bottom: none;
}
#disc div:last-child {
  width: 8px !important;
  height: 8px !important;
  background: var(--Deep);
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
#Crank {
  position: absolute;
  top: -8px;
  left: 50%;
  transform-origin: top;
  transform: translateX(-50%) rotate(-60deg);
  width: 6px;
  height: 20px;
  transition: all 0.24s;
}
#Crank div {
  position: absolute;
}
#Crank div:nth-child(1) {
  top: -3px;
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background: var(--Virtual);
  box-shadow: 0 0 0 0.2px var(--Real);
}
#Crank div:nth-child(1)::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: var(--Real);
}
#Crank div:nth-child(2) {
  top: 0;
  left: 50%;
  transform-origin: top;
  transform: translateX(-50%) rotate(12deg);
  height: 14px;
  width: 2px;
  background: var(--Virtual);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: 0 0 0 0.2px var(--Real);
  z-index: -1;
}
#Crank div:nth-child(3) {
  bottom: 0;
  right: 2px;
  transform-origin: bottom;
  transform: translateX(-50%) rotate(-24deg);
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  height: 8px;
  width: 1px;
  background: var(--Virtual);
  box-shadow: 0 0 0 0.2px var(--Real);
  z-index: -2;
}
@media screen and (max-width: 640px) {
  #Music {
    position: fixed;
    right: 20px;
    bottom: 20px;
    top: auto;
  }
}
</style>
