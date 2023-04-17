<script setup>
const route = useRoute();
const onReady = ref(false);
const backMusic = ref(null);
const Musics = Object.keys(import.meta.globEager("./**/*.mp3"));
const Move = Musics[Math.floor(Math.random() * Musics.length)];
Musics.splice(Musics.indexOf(Move), 1);
Musics.unshift(Move);
const Music = ref(Musics[0].replace("/public", ""));
useHead({
  titleTemplate: () => {
    return `${
      route.path == "/"
        ? "HsuQNian | Home"
        : `HsuQNian | ${route.path.slice(1)[0].toUpperCase()}${route.path
            .slice(2)
            .replaceAll("/", " | ")
            .replace("-", " ")}`
    }`;
  },
});
onMounted(() => {
  document.readyState == "complete"
    ? (onReady.value = true) && backMusic.value.play()
    : "";
});
const next = () => {
  Music.value = Musics[
    Musics.indexOf(Music.value.replace("/", "/public/")) + 1 > Musics.length - 1
      ? 0
      : Musics.indexOf(Music.value.replace("/", "/public/")) + 1
  ].replace("/public", "");
  console.log(Music.value.replace("/", "/public"));
  backMusic.value.load();
  backMusic.value.play();
};
</script>
<template>
  <audio ref="backMusic" preload="metadata" controls @ended="next">
    <source :src="Music" type="audio/mpeg" />
  </audio>
  <transition name="Loading" mode="out-in">
    <Loading v-if="!onReady" />
    <div v-else>
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
