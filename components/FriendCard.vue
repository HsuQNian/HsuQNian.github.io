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
    <div style="display: flex; flex-direction: row; align-items: center">
      <img v-if="!!app.avatar" id="avatar" :src="avatar" loading="lazy" />
      <div v-else id="avatar" class="noAvatar" />
      <h5 style="margin: 0 0.8rem; letter-spacing: 1px">
        {{ app.name }}
      </h5>
    </div>
    <div class="descr" style="display: flex; align-items: center">
      {{ app.descr ? app.descr : "&nbsp;" }}
    </div>
    <div id="arrow" />
  </a>
</template>
<style scoped>
a {
  width: 240px;
  height: 100px;
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
  opacity: .8;
}
h2 {
  margin: 0;
  font-size: 1.25rem;
}

a:is(:hover, :focus-within) {
  color: var(--theme);
  box-shadow: 0px 0px 0.4px var(--theme), 0px 0px 1.1px var(--theme),
    0px 0px 2.7px var(--theme), 0px 0px 9px var(--theme);
}
a:hover #arrow {
  transform: rotate(45deg) translateY(-200%) translateX(-40%);
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
.descr {
  height: 72px;
}
#avatar {
  width: 48px;
  height: 48px;
  background: var(--Deep);
  border-radius: 12px;
  border: 0.1px solid var(--Virtual);
}
.noAvatar {
  border: 0.1px solid var(--Virtual);
}
#arrow {
  position: absolute;
  top: 50%;
  right: 16%;
  width: 18px;
  height: 18px;
  transform: translateY(-180%) translateX(-960%) rotate(-135deg);
  z-index: -1;
  transition: all 0.48s ease-in-out;
  border-radius: 0.1rem;
  transform-origin: center center;
}
#arrow::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  border-radius: 0.1rem;
  border-right: 2px solid transparent;
  border-top: 2px solid transparent;
  transition: all 0.36s ease-in-out;
  border-right: 2px solid var(--theme);
  border-top: 2px solid var(--theme);
}
@media screen and (max-width: 700px) {
  a {
    width: 168px;
    padding: 0.8rem 0.8rem;
    height: auto;
  }
  .descr {
    height: 88px;
  }
}
</style>
