<script setup>
const route = useRoute();
useHead({
  titleTemplate: () => {
    return `${
      route.path == "/"
        ? "HsuQNian | Home"
        : `HsuQNian | ${route.path
            .slice(1)[0]
            .toUpperCase()}${route.path.slice(2)}`
    }`;
  },
});
</script>
<template>
  <div>
    <TheHeader />
    <video id="backVideo" loop muted autoplay preload="true">
      <source src="./public/back.mp4" type="video/mp4" />
    </video>
    <NuxtPage />
  </div>
</template>
<style scoped>
#backVideo {
  top: 0;
  left: 0;
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
