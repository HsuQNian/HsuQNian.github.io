<script setup>
import { Store } from "../store/index.js";
const currentTime = ref(0);
const duration = ref("00:00");
const store = Store();
const MusicList = Object.keys(import.meta.globEager("../**/*.mp3")).sort(
  () => Math.random() - 0.5
);
const schedule = () => {
  store.Music.currentTime = store.Music.duration * (event.offsetX / 300);
};
store.MusicList = MusicList;
store.Music = new Audio(MusicList[0].replace("../public/", "./"));
store.Music.preload = "none";
store.Music.load();
store.Music.onplay = () => {
  store.MusicPlaying = true;
};
store.Music.onpause = () => {
  store.MusicPlaying = false;
};
store.Music.onended = () => {
  store.MusicPlaying = false;
  store.MusicListIndex =
    store.MusicListIndex != store.MusicList.length - 1
      ? ++store.MusicListIndex
      : 0;
  store.Music.src = store.MusicList[store.MusicListIndex].replace(
    "../public/",
    "./"
  );
  store.Music.play();
  store.MusicPlaying = true;
};
store.Music.ondurationchange = () => {
  duration.value = new Date(
    Math.trunc(store.Music.duration) * 1000
  ).toLocaleString("chinese", {
    minute: "2-digit",
    second: "2-digit",
  });
};
store.Music.ontimeupdate = () => {
  currentTime.value = new Date(
    Math.trunc(store.Music.currentTime) * 1000
  ).toLocaleString("chinese", {
    minute: "2-digit",
    second: "2-digit",
  });
};
</script>
<template>
  <div
    id="Music"
    :style="{
      transform: store.MusicDisplay
        ? 'translate(-50%, 10%) '
        : 'translate(-50%, -200%) ',
    }"
  >
    <div class="Music-Title" style="flex: 1; margin-top: 6px">
      <div
        style="
          font-size: 0.8rem;
          line-height: 40px;
          padding: 0 10px;
          width: 40%;
          height: 40px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        "
      >
        {{
          store.MusicList[store.MusicListIndex].match(
            /(?<=\.\.\/public\/).*(?=.mp3)/g
          )[0]
        }}
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex: 1;
          width: 60%;
        "
      >
        <button
          @click="
            () => {
              store.MusicListIndex =
                store.MusicListIndex != 0
                  ? --store.MusicListIndex
                  : store.MusicList.length - 1;
              store.log = store.MusicListIndex;
              store.Music.src = store.MusicList[store.MusicListIndex].replace(
                '../public/',
                './'
              );
              store.Music.play();
            }
          "
        />
        <button
          :style="{
            clipPath: store.MusicPlaying
              ? 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
              : 'polygon(100% 50%, 0 0, 0 100%)',
            background: store.MusicPlaying ? 'transparent' : '#fff',
          }"
          @click="
            () => {
              store.Music.paused ? store.Music.play() : store.Music.pause();
            }
          "
        />
        <button
          @click="
            () => {
              store.MusicListIndex =
                store.MusicListIndex != store.MusicList.length - 1
                  ? ++store.MusicListIndex
                  : 0;
              store.Music.src = store.MusicList[store.MusicListIndex].replace(
                '../public/',
                './'
              );
              store.Music.play();
            }
          "
        />
        <button
          @click="
            () => {
              store.MusicListShow = !store.MusicListShow;
            }
          "
        >
          <div />
        </button>
      </div>
    </div>
    <div style="flex: 1; font-size: 0.6rem">
      <div id="schedule" @click="schedule">
        <div
          style="
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: var(--theme);
            border-radius: 2px;
          "
          :style="{
            width: (store.Music.currentTime / store.Music.duration) * 100 + '%',
          }"
        />
      </div>
      <div>{{ currentTime == 0 ? "00:00" : currentTime }}</div>
      <div>&nbsp;/&nbsp;</div>
      <div>{{ duration }}</div>
    </div>
  </div>
  <div
    id="MusicList"
    :style="{
      transform: store.MusicListShow
        ? 'translate(-50%,-50%)'
        : 'translate(-50%,-280%) ',
      opacity: store.MusicListShow ? 1 : 0,
    }"
  >
    <div
      v-for="index in store.MusicList"
      @click="
        () => {
          if (store.MusicListIndex != store.MusicList.indexOf(index)) {
            store.Music.src = index.replace('../public/', './');
            store.MusicListIndex = store.MusicList.indexOf(index);
            store.Music.play();
          }
        }
      "
    >
      <div
        style="
          width: 4px;
          height: 16px;
          border-radius: 20px;
          position: relative;
          left: -4px;
        "
        :style="{
          background:
            store.MusicListIndex == store.MusicList.indexOf(index)
              ? 'var(--theme)'
              : 'transparent',
        }"
      />
      {{ index.match(/(?<=\.\.\/public\/).*(?=.mp3)/g)[0] }}
    </div>
  </div>
</template>
<style scoped>
#Music {
  top: 6%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  height: 80px;
  width: 400px;
  background: #bbb4;
  backdrop-filter: blur(0.4rem);
  border-radius: 0.4rem;
  transition: all 0.56s cubic-bezier(0.18, 0.89, 0.32, 1.12);
  z-index: 101;
  color: var(--theme);
  display: flex;
  align-items: center;
  flex-direction: column;
}
#Music > div:not(#MusicList) {
  display: flex;
  width: 100%;
  align-items: center;
}
#schedule {
  width: 300px;
  height: 4px;
  background: #fff;
  border-radius: 2px;
  position: relative;
  margin: 0 0.4rem;
}

button:nth-child(1),
button:nth-child(3) {
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 16px solid #fff;
  border-left: 0px;
  padding: 0;
}
button:nth-child(2) {
  transition: all 0.4s ease;
}
button:nth-child(2)::before,
button:nth-child(2)::after {
  content: "";
  display: block;
  position: absolute;
  width: 6px;
  height: 28px;
  background: #fff;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  border-radius: v-bind("store.MusicPlaying?'4px':'0px'");
}
button:nth-child(2)::after {
  left: 10px;
}
button:nth-child(3) {
  transform: rotate(180deg);
  position: relative;
}
button:nth-child(4) {
  transform: rotate(90deg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
button:nth-child(4) > div {
  height: 14px;
  width: 2px;
  background: #fff;
}
button:nth-child(4)::after {
  position: absolute;
  left: 0 !important;
}
button:nth-child(1)::before,
button:nth-child(3)::before,
button:nth-child(4)::before,
button:nth-child(4)::after {
  content: "";
  display: block;
  position: absolute;
  height: 16px;
  width: 2px;
  background: #fff;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  border-radius: 4px;
}
button {
  background: none;
  border: none;
  height: 16px;
  width: 16px;
  position: relative;
}
#MusicList {
  position: fixed;
  top: 24%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  width: 400px;
  font-size: 0.8rem;
  background: #bbb4;
  backdrop-filter: blur(0.4rem);
  border-radius: 0.4rem;
  opacity: 1;
  padding: 10px 0;
  transition: all 0.56s cubic-bezier(0.18, 0.89, 0.32, 1.12);
  z-index: 100;
}
#MusicList > div {
  padding: 0 10px;
  display: flex;
  align-items: center;
  /* line-height: 1rem; */
}
#MusicList > div:hover {
  background: #fff8;
  color: var(--theme);
}
</style>
