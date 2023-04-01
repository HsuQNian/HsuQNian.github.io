<script setup>
const router = useRouter();
const modules = import.meta.globEager("./**/*.vue");
let project = [];
Object.keys(modules).map((key) => {
  project.push(key.split("/")[1]);
});
const projectImg = computed(() => {
  return (param) => `../assets/resources/${param}/${param}.png`;
});
const to = (index) => {
  router.push({ path: `software/${index}` });
};
</script>
<template>
  <div style="display: flex; width: 100vw; margin-top: 40px">
    <div class="AppList">
      <div
        v-for="index in project"
        :key="index"
        @click="to(`${index}`)"
        class="block"
        style="
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          padding: 0 40px;
        "
      >
        <img
          :src="projectImg(index)"
          style="width: 100px; border-radius: 20px; margin-bottom: 40px"
        />
        <div style="font-size: 2.4rem; font-weight: 100">{{ index }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.AppList {
  transition: all 0.64s cubic-bezier(0.18, 0.89, 0.32, 1.12);
  align-items: start;
  margin: auto;
  height: 100vh;
  display: grid;
  overflow: scroll;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 100px;
  column-gap: 120px;
}
.block {
  border-radius: 24px;
  max-height: 280px;
  min-height: 240px;
  max-width: 140px;
  min-width: 120px;
  position: relative;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  margin-top: 50px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 8px 0 rgba(0, 0, 0, 0.1),
    0 16px 24px 0 rgba(0, 0, 0, 0.1), 0 24px 32px 0 rgba(0, 0, 0, 0.1);
}
.block:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.36;
  filter: blur(4px);
  z-index: -1;
}
</style>
