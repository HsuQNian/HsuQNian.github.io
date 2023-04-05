<script setup>
import { ref } from "vue";
import { global } from "../../../global/index.js";
let AppName = "Notice";
let url = ref("");
let version = ref("");
let WinUrl = ref("");
let LinuxUrl = ref("");
let describe = ref("");
// let description = ref("");
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
    // description.value = json.description;
  });
const loadPicture = computed(() => async (pictureUrl) => {
  let returnBoolean;
  await fetch(pictureUrl)
    .then((res) => res.blob())
    .then((data) => {
      returnBoolean = data.size > 0 ? true : false;
    });
  return returnBoolean;
});
const height = ref(0);
const scroll = () => {
  height.value = event.target.scrollTop + 72;
};
</script>
<template>
  <div class="Notice" @scroll="scroll(event)">
    {{ height }}
    <Back :router="'/software'" :height="height" />
    <div class="introduce" style="flex: 1">
      <h1 style="font-size: 4rem; margin: 1.2rem">{{ AppName }}</h1>
      <p>当前版本 : {{ version }}</p>
      <p style="margin-top: 20px">下载</p>
      <div id="link" style="margin-top: 20px">
        <div class="Windows">
          <Button :text="'Windows'" :url="WinUrl" />
        </div>
        <div class="Linux">
          <Button :text="'Linux'" :url="LinuxUrl" />
        </div>
      </div>
    </div>
    <div class="describe">
      <div v-for="(item, index) in describe" :key="index">
        <img
          v-show="
            loadPicture(`${global.assetLink}Notice/picture${index + 1}.png`)
          "
          :src="`${global.assetLink}Notice/picture${index + 1}.png`"
        />
        <div v-html="item"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
p {
  margin: 0.2rem;
}

#link > div > a:active {
  transition: all 0.01s ease;
  border-right: #aebdb7 0 solid;
  border-bottom: #b0bab1 0 solid;
  user-select: none;
  transform: translateX(1px) translateY(1px);
}

.Notice {
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
  align-items: flex-start;
  width: 40%;
  border-radius: 12px;
  margin-top: 10px;
}
#link > div {
  flex: 1;
  display: flex;
  margin-bottom: 18px;
  width: 100%;
  justify-content: center;
  margin-right: auto;
  align-items: center;
}
.describe > div {
  width: 100vw;
  height: 100vh;
  border-top: 1px solid var(--theme);
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
