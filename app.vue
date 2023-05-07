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
});
onMounted(() => {
  document.readyState == "complete" ? (onReady.value = true) : "";
});
</script>
<template>
  <transition name="Loading" mode="out-in">
    <Loading v-if="!onReady" />
    <div v-else>
      <Music />
      <TheHeader />
      <NuxtPage />
      <TheFooter />
    </div>
  </transition>
</template>
<style scoped>
audio {
  display: none;
  position: absolute;
  top: 50%;
}
.back-enter,
.back-enter-active {
  transition: all 0.36s ease 0.36s;
}
.back-leave,
.back-leave-active {
  transition: all 0.36s ease;
}
.back-leave-to,
.back-enter-from {
  transform: translateX(-180%);
}
</style>
