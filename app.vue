<script setup>
const route = useRoute();
const onReady = ref(false);
useHead({
  titleTemplate: () => {
    return `${
      route.path == "/"
        ? "HsuQNian | Home"
        : `HsuQNian | ${route.path.slice(1)[0].toUpperCase()}${route.path
            .slice(2)
            .replaceAll("/", " | ")
            .replaceAll("-", " ")}`
    }`;
  },
  link: [
    {
      rel: "device-width",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
  script: [
    {
      src: "https://hsuqnian.top/sakura.js",
    },
  ],
  meta: [
    {
      name: "baidu-site-verification",
      content: "codeva-jJBOVj43Mi",
    },
    {
      name: "viewport",
      content:
        "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0",
    },
  ],
});
onMounted(() => {
  if (document.readyState == "complete") {
    onReady.value = true;
    startSakura();
  }
});
</script>
<template>
  <transition name="Loading" mode="out-in">
    <Loading v-if="!onReady" />
    <div v-else>
      <TheHeader />
      <Music />
      <NuxtPage />
      <TheFooter />
    </div>
  </transition>
</template>
<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1002;
}
</style>
