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
const to = (way) => {
  router.push({ path: `project/${way}` });
};
</script>
<template>
  <div
    style="
      display: flex;
      height: 100vh;
      width: 100vw;
      align-items: center;
      flex-direction: column;
    "
  >
    <div
      style="
        height: 100px;
        line-height: 200px;
        color: var(--Real);
        font-size: 16px;
      "
    >
      通过不断学习，实现灵光一现
    </div>
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
  align-items: flex-start;
  margin: auto;
  height: 92vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 100px;
  column-gap: 120px;
}
.block {
  border-radius: 8px;
  max-height: 280px;
  min-height: 240px;
  max-width: 140px;
  min-width: 120px;
  position: relative;
  backdrop-filter: blur(8px);
  margin-top: 50px;
  position: relative;
  box-shadow: 0px 0px 0.4px rgba(0, 0, 0, 0.499),
    0px 0px 1.1px rgba(0, 0, 0, 0.602), 0px 0px 2.7px rgba(0, 0, 0, 0.608),
    0px 0px 9px rgba(0, 0, 0, 0.4);
}

@media screen and (max-width: 1200px) {
  .AppList {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 0;
    width: 94vw;
  }
}
@media screen and (max-width: 800px) {
  .AppList {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 72px;
    column-gap: 0;
    width: 88vw;
  }
}
</style>
