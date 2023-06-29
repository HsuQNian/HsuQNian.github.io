<script setup>
import { ref } from "vue";
import { global } from "../../../global/index.js";
const router = useRouter();
let AppName = "Notice";
let url = ref("");
let version = ref("");
let WinUrl = ref("");
// let LinuxUrl = ref("");
let describe = ref("");
// let description = ref("");
fetch(`${location.origin}/api/project/Notice`)
  .then((res) => res.json())
  .then((data) => {
    url.value = `${global.downloadLink}${AppName}v${data.version}/${AppName}`;
    WinUrl.value = `${url.value}-${data.version}.exe`;
    // LinuxUrl.value = `${url.value}-${json.version}.dmg`;
    version.value = data.version;
    describe.value = data.describe;
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
// const height = ref(0);
// const scroll = () => {
//   height.value = event.target.scrollTop + 72;
// };
</script>
<template>
  <div class="Notice">
    <div class="introduce" style="flex: 1">
      <h1 style="font-size: 4rem; margin: 1.2rem">
        {{ AppName }}
      </h1>
      <p>
        当前版本 :
        <span
          style="
            text-decoration: underline;
            color: var(--theme);
            cursor: pointer;
          "
          @click="
            router.push({
              path: '/project/Notice/help',
            })
          "
        >
          {{ version }}
        </span>
        <span
          style="
            color: var(--theme);
            text-decoration: underline;
            margin-left: 8px;
            cursor: pointer;
            font-style: 0.9rem;
            font-weight: 200;
          "
          @click="
            router.push({
              path: '/project/Notice/feedback',
            })
          "
          >反馈</span
        >
      </p>

      <div id="link" style="margin-top: 20px">
        <div class="Windows">
          <Button :text="'Windows'" :url="WinUrl" />
        </div>
        <!-- <div class="Linux">
          <Button :text="'Linux'" :url="LinuxUrl" />
        </div> -->
      </div>
    </div>
    <div class="describe">
      <div v-for="(item, index) in describe" :key="index">
        <img
          v-show="
            loadPicture(`${global.assetLink}Notice/picture${index + 1}.png`)
          "
          :src="`${global.assetLink}Notice/picture${index + 1}.png`"
          referrerpolicy="no-referrer"
          style="box-shadow: 0 0 2px rgba(0, 0, 0, 1); border-radius: 8px"
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
  width: 24%;
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
  #link {
    width: 40%;
  }
  .describe > div > img {
    width: 40%;
  }
}
@media screen and (max-width: 650px) {
  #link {
    width: 80%;
  }
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
