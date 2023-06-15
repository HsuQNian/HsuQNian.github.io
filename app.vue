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
  meta: [
    {
      name: "baidu-site-verification",
      content: "codeva-jJBOVj43Mi",
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
      <TheHeader />
      <Music />
      <NuxtPage />
      <TheFooter />
    </div>
  </transition>
</template>
