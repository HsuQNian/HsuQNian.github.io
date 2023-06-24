<script setup>
import { Store } from "../store/index.js";
const store = Store();
const router = useRouter();
const mobileHeader = ref(false);
router.beforeResolve((to, from, next) => {
  mobileHeader.value = false;
  next();
});
</script>
<template>
  <div class="header">
    <nuxt-link to="/">主页</nuxt-link>
    <nuxt-link to="/blog">博客</nuxt-link>
    <nuxt-link to="/project">项目</nuxt-link>
    <nuxt-link to="/friends">友链</nuxt-link>
    <nuxt-link to="/about">关于</nuxt-link>
  </div>
  <div class="toggle-menu" @click="mobileHeader = !mobileHeader" />
  <transition name="miscellaneous">
    <div
      v-if="mobileHeader"
      class="mobileHeader"
      @click.self="mobileHeader = !mobileHeader"
    >
      <nuxt-link to="/">主页</nuxt-link>
      <nuxt-link to="/blog">博客</nuxt-link>
      <nuxt-link to="/project">项目</nuxt-link>
      <nuxt-link to="/friends">友链</nuxt-link>
      <nuxt-link to="/about">关于</nuxt-link>
    </div>
  </transition>

  <div
    id="MusicDisc"
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
        AnimationPlayState:
          store.MusicPlaying && store.MusicCanPlay ? 'running' : 'paused',
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
      style="opacity: 0"
      :style="{
        Animation:
          store.MusicSwitch && !store.MusicPlaying
            ? 'songChange .56s  .12s forwards'
            : '',
      }"
    >
      <div
        id="disc"
        :style="{
          AnimationPlayState:
            store.MusicPlaying && store.MusicCanPlay ? 'running' : 'paused',
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
    </div>
    <div
      id="Crank"
      :style="{
        transform:
          store.MusicPlaying && !store.MusicSwitch
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
.toggle-menu {
  display: none;
}
.mobileHeader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: none;
}
.mobileHeader a {
  margin: 8px 0;
  text-decoration: none;
  letter-spacing: 6px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.24s;
  color: var(--Real);
}
a.router-link-exact-active {
  color: var(--theme);
}
#MusicDisc {
  width: 32px;
  height: 32px;

  margin-left: auto;
  position: fixed;
  right: 20px;
  top: calc(1% + 18px);
  z-index: 1001;
}
#disc {
  animation: rotate 8s linear infinite;
  top: 50%;
  left: 50%;
  background: var(--Real);
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
#disc > div {
  position: absolute;
  border-radius: 50%;
  border: 0.1px solid #888;
  top: 50%;
  left: 50%;
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
  transition: all 0.84s;
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
@media screen and (max-width: 540px) {
  #MusicDisc {
    position: fixed;
    right: 20px;
    bottom: 20px;
    top: auto;
  }
  .header {
    display: none;
  }
  .mobileHeader {
    display: flex;
  }
  .toggle-menu {
    display: block;
    width: 26px;
    height: 26px;
    position: fixed;
    left: 20px;
    bottom: 24px;
    z-index: 1001;
  }

  .toggle-menu::before,
  .toggle-menu::after {
    bottom: 0;
    content: "";
    position: absolute;
    width: 2px;
    height: 32px;
    background: var(--Virtual);
    border-radius: 2px;
    transition: all 0.24s;
    transform: rotate(v-bind("mobileHeader?'45deg':'90deg'"));
    transform-origin: bottom;
  }
  .toggle-menu::after {
    right: 0;
    transform: rotate(v-bind("mobileHeader?'-45deg':'90deg'"))
      translate(v-bind("mobileHeader?'0,0':'-400%, 74%'"));
  }
}
</style>
<style>
@keyframes songChange {
  0% {
    transform: translate(-0%, -100%);
    opacity: 1;
  }
  100% {
    transform: translate(-60%, -100%);
    opacity: 0;
  }
}
</style>
