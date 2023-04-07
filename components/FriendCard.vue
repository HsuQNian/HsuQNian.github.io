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
    <img id="avatar" :src="avatar" />
    <h2>
      {{ app.name }}
    </h2>
    <p>
      {{ app.descr }}
    </p>
  </a>
</template>
<style scoped>
a {
  width: 240px;
  max-height: 140px;
  min-height: 120px;
  position: relative;
  box-shadow: 0px 0px 0.4px rgba(0, 0, 0, 0.499),
    0px 0px 1.1px rgba(0, 0, 0, 0.602), 0px 0px 2.7px rgba(0, 0, 0, 0.608),
    0px 0px 9px rgba(0, 0, 0, 0.4);
  line-height: 1.2;
  padding: 1rem 1.3rem;
  border-radius: 0.35rem;
  opacity: 0.8;
  color: var(--Virtual);
  transition: all 0.24s ease-in-out;
  margin: 20px;
}
h2 {
  margin: 0;
  font-size: 1.25rem;
}

a:is(:hover, :focus-within) {
  color: var(--theme);
}
#avatar {
  width: 64px;
  height: 64px;
  border-radius: 12px;
}
</style>
