<script setup>
const route = useRoute();
useHead({
  titleTemplate: () => {
    return `${
      route.path == "/"
        ? "HsuQNian | Home"
        : `HsuQNian | ${route.path.slice(1)[0].toUpperCase()}${route.path.slice(
            2
          )}`
    }`;
  },
});
</script>
<template>
  <TheHeader />
  <NuxtPage />
  <TheFooter />
</template>
<style scoped>
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
