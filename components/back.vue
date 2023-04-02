<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const app = defineProps({
  router: String,
});
const backHome = () => {
  router.push(app.router);
};
</script>
<template>
  <div class="backHome" @click="backHome"></div>
</template>
<style scoped>
.backHome {
  position: fixed;
  top: 72px;
  left: 54px;
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
  border-left: 2px solid var(--Real);
  border-bottom: 2px solid var(--Real);
  transform: rotate(45deg) translateX(-36%) translateY(-36%);
}
.backHome::before {
  position: fixed;
  content: "";
  width: 20px;
  height: 20px;
  transform: rotate(45deg) translateX(-20%) translateY(-48%);
  border-left: 12px solid var(--Real);
  border-bottom: 12px solid var(--Real);
  top: 50%;
  left: 12px;
  transition: all 0.24s ease-in-out;
}
</style>
