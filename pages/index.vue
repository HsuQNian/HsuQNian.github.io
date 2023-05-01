<script setup>
const modules = import.meta.globEager("./**/*.vue");
let project = [];
Object.keys(modules).map((key) => {
  project.push(key.split("/")[1]);
});
</script>
<template>
  <div id="home">
    <div
      style="
        background-image: linear-gradient(45deg, var(--theme) 30%, #33c4df 84%);
        -webkit-background-clip: text;
      "
    >
      <h1>HsuQNian</h1>
    </div>
  </div>
</template>
<style scoped>
#home {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
h1 {
  font-size: 8rem;
  color: transparent;
  transition: all 0.64s cubic-bezier(0.18, 0.89, 0.32, 1.12);
}
@media screen and (max-width: 1200px) {
  h1 {
    font-size: 6rem !important;
  }
}
@media screen and (max-width: 800px) {
  h1 {
    font-size: 4rem !important;
  }
}
</style>
