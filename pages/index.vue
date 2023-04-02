<script setup>
const router = useRouter();
const modules = import.meta.globEager("./**/*.vue");
let project = [];
Object.keys(modules).map((key) => {
  project.push(key.split("/")[1]);
});

const to = (index) => {
  router.push({ path: index });
};
</script>
<template>
  <div id="home">
    <div
      style="
        background-image: linear-gradient(45deg, var(--theme) 30%, #33c4df 84%);
        -webkit-background-clip: text;
      "
    >
      <h1 style="font-size: 8rem; color: transparent">HsuQNian</h1>
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

.AppList {
  transition: all 0.64s cubic-bezier(0.18, 0.89, 0.32, 1.12);
  align-items: start;
  margin: auto;
  height: 100vh;
  display: grid;
  overflow: scroll;
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 100px;
  column-gap: 120px;
}

.picture {
  width: 100px;
  height: 100px;
  background-image: url("../picture.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
}
.information {
  display: flex;
  width: 160px;
  justify-content: space-between;
  margin-top: 24px;
  position: relative;
}
.information div:not(.github)::after {
  content: "";
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: transparent;
  border-radius: 12px;
  transition: all 0.64s cubic-bezier(0.18, 0.89, 0.32, 1.12);
  z-index: 1;
}
.information div:nth-child(1):after {
  pointer-events: none;
  border: 10px solid #f4f9fb;
  opacity: 0;
  left: -64%;
  top: -1000%;
  background: url("../QQ.png") no-repeat;
  background-size: cover;
}
.information div:nth-child(1):hover::after {
  opacity: 1;
  left: -64%;
  top: 200%;
}
.information div:nth-child(2):after {
  background: url("../WX.png") no-repeat;
  border: 10px solid #29ad68;
  background-size: cover;
  pointer-events: none;
  opacity: 0;
  left: -20%;
  top: -1000%;
}
.information div:nth-child(2):hover::after {
  opacity: 1;
  left: -20%;
  top: 200%;
}
.information div {
  cursor: pointer;
}
</style>
