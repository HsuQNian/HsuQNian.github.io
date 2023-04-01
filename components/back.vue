<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const backHome = () => {
  router.push("/");
};
</script>
<template>
  <div class="backHome" @click="backHome"></div>
</template>
<style scoped>
.backHome {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  background-size: cover;
  filter: blur(4px);
  transition: all 0.3s ease-in-out;
  z-index: 1000;
}
.backHome:hover {
  border-radius: 12px;
  filter: blur(0);
}
.backHome:hover::before {
  border-left: 2px solid var(--theme);
  border-bottom: 2px solid var(--theme);
  transform: rotate(45deg);
}
.backHome::before {
  position: fixed;
  content: "";
  width: 20px;
  height: 20px;
  transform: rotate(45deg) translateY(-4px);
  border-left: 12px solid var(--theme);
  border-bottom: 12px solid var(--theme);
  top: 16px;
  left: 12px;
  transition: all 0.24s ease-in-out;
}
</style>
