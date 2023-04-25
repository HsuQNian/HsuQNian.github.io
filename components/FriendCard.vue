<script setup>
const app = defineProps({
  link: String,
  descr: String,
  name: String,
  avatar: String,
});
</script>
<template>
  <a :href="app.link" target="_blank">
    <img v-if="!!app.avatar" id="avatar" :src="avatar" loading="lazy"/>
    <div v-else id="avatar" class="noAvatar"></div>
    <h2 style="margin: 0.4rem 0">
      {{ app.name }}
    </h2>
    <p style="margin: 0.4rem 0; font-size: 0.9rem">
      {{ app.descr ? app.descr : "&nbsp;" }}
    </p>
    <div id="arrow"></div>
  </a>
</template>
<style scoped>
a {
  width: 240px;
  height: 140px;
  position: relative;
  box-shadow: 0px 0px 0.4px rgba(0, 0, 0, 0.499),
    0px 0px 1.1px rgba(0, 0, 0, 0.602), 0px 0px 2.7px rgba(0, 0, 0, 0.608),
    0px 0px 9px rgba(0, 0, 0, 0.4);
  line-height: 1.2;
  padding: 1rem 1rem;
  border-radius: 0.36rem;
  color: var(--Virtual);
  transition: all 0.24s ease-in-out;
  margin: 20px;
  overflow: hidden;
  opacity: v-bind("link!=null ? 0.8 : 0");
  user-select: v-bind("link!=null ? text : 'none'");
}
h2 {
  margin: 0;
  font-size: 1.25rem;
}

a:is(:hover, :focus-within) {
  color: var(--theme);
}
a:hover #arrow {
  transform: rotate(45deg) translateY(-150%) translateX(-200%);
}
a:hover #arrow::before {
  border-right: 2px solid var(--theme);
  border-top: 2px solid var(--theme);
  animation: float 2.4s 0.48s ease-in-out infinite alternate;
}
@keyframes float {
  50% {
    transform: translateY(-44%) translateX(44%);
  }
}
#avatar {
  width: 64px;
  height: 64px;
  background: var(--Deep);
  border-radius: 12px;
}
.noAvatar {
  border: 1px solid var(--Virtual);
}
#arrow {
  position: absolute;
  top: 50%;
  right: 16%;
  width: 18px;
  height: 18px;
  transform: translateY(-260%) translateX(-880%) rotate(-135deg);
  z-index: -1;
  transition: all 0.48s ease-in-out;
  border-radius: 0.1rem;
}
#arrow::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.1rem;
  border-right: 2px solid transparent;
  border-top: 2px solid transparent;
  transition: all 0.36s ease-in-out;
  border-right: 2px solid var(--theme);
  border-top: 2px solid var(--theme);
}
</style>
