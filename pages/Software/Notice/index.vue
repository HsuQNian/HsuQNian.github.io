<script setup>
import { ref } from "vue";
import { global } from "../../../global/index.js";
let AppName = "Notice";
let url = ref("");
let version = ref("");
let WinUrl = ref("");
let LinuxUrl = ref("");
let describe = ref("");
let assetLink = ref(global.assetLink);
let description = ref("");
fetch(`${global.assetLink}${AppName}/${AppName}.json`)
  // fetch(`../../../public/assets/resources/Notice/Notice.json`)
  .then((res) => res.text())
  .then((data) => {
    const json = JSON.parse(data);
    url.value = `${global.downloadLink}${AppName}v${json.version}/${AppName}`;
    WinUrl.value = `${url.value}-${json.version}.exe`;
    LinuxUrl.value = `${url.value}-${json.version}.dmg`;
    version.value = json.version;
    describe.value = json.describe;
    description.value = json.description;
  });
</script>
<template>
  <div class="Notice">
    <div class="introduce" style="flex: 1">
      <h1 style="font-size: 4rem; margin: 1.2rem">{{ AppName }}</h1>
      <p>当前版本 : {{ version }}</p>
      <p style="margin-top: 20px">下载</p>
      <div id="link">
        <div class="Windows">
          <span>Windows:</span>
          <a :href="WinUrl">EXE</a>
        </div>
        <div class="Linux">
          <span>Linux:</span>
          <a :href="LinuxUrl">Linux</a>
        </div>
      </div>
      <p style="position: absolute; bottom: 4px; font-weight: 400">
        下划了解更多
      </p>
    </div>
    <div class="describe">
      <div v-for="(item, index) in describe" :key="index">
        <img :src="`${assetLink}Notice/picture${index + 1}.png`" />
        <div v-html="item"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
p {
  margin: 0.2rem;
}
#link > div > a {
  border: none;
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(12px);
  height: 36px;
  width: 80px;
  clip-path: polygon(
    0 0,
    5% 0,
    5% 15%,
    10% 15%,
    10% 0,
    100% 0,
    100% 75%,
    95% 75%,
    95% 85%,
    100% 85%,
    100% 100%,
    50% 100%,
    50% 85%,
    45% 85%,
    45% 100%,
    0 100%,
    0 65%,
    5% 65%,
    5% 50%,
    0 50%,
    0 0
  );
  border-top-right-radius: 5px;
  border-right: #aebdb7 2px solid;
  border-bottom: #b0bab1 2px solid;
  transition: all 0.6s ease;
}
#link > div > a:active {
  transition: all 0.01s ease;
  border-right: #aebdb7 0 solid;
  border-bottom: #b0bab1 0 solid;
  user-select: none;
  transform: translateX(1px) translateY(1px);
}

.Notice {
  background: rgba(0, 0, 0, 0.1);
  height: 100vh;

  backdrop-filter: blur(4px);
  overflow: scroll;
  scroll-snap-type: y mandatory;
}
.introduce {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  scroll-snap-align: start;
  position: relative;
}
#link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 200px;
  border-radius: 12px;
  margin-top: 10px;
}
#link > div {
  flex: 1;
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
  width: 100%;
  margin-right: auto;
  align-items: center;
}
.describe > div {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: contrast(1);
  border: 1px solid var(--theme);
  border-radius: 10px;
  scroll-snap-align: end;
  display: flex;
  justify-content: center;
  align-items: center;
}
.describe > div > img {
  transition: all 0.24s ease-in-out;
}
.describe > div > div {
  width: 40%;
  height: 80%;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
@media screen and (max-width: 1342px) {
  .describe > div > img {
    width: 40%;
  }
}
@media screen and (max-width: 650px) {
  .describe > div > img {
    width: 80%;
  }
  .describe > div {
    flex-direction: column;
  }
  .describe > div > div {
    margin-top: 20px;
    width: 80%;
    height: 10%;
  }
}
</style>
