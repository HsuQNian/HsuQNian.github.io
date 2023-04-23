<script setup>
import { Store } from "../store/index.js";
const currentTime = ref(0);
const duration = ref(0);
const store = Store();
const MusicList = Object.keys(import.meta.globEager("../**/*.mp3")).sort(
  () => Math.random() - 0.5
);
const schedule = () => {
  store.Music.currentTime = store.Music.duration * (event.offsetX / 240);
};
store.MusicList = MusicList;
store.Music = new Audio(MusicList[0].replace("../public/", "./"));
console.log(store.Music);
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
        ? 'translate(-50%, 0) '
        : 'translate(-50%, -200%) ',
    }"
  >
    <div class="Music-Title" style="flex: 2">
      <h2 style="text-align: center; font-size: 1.4rem; line-height: 40px">
        <div>
          {{
            store.MusicList[store.MusicListIndex]
              .match(/(?<=\.\.\/public\/).*(?=.mp3)/g)[0]
              .split("-")[0]
          }}
        </div>
        <div>
          {{
            store.MusicList[store.MusicListIndex]
              .match(/(?<=\.\.\/public\/).*(?=.mp3)/g)[0]
              .split("-")[1]
          }}
        </div>
      </h2>
    </div>
    <div style="flex: 0; font-size: 0.8rem">
      <div>{{ currentTime == 0 ? "00:00" : currentTime }}</div>
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
      <div>
        {{ duration }}
      </div>
    </div>
    <div
      class="Music-controller"
      style="
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 40%;
        flex: 0.5;
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
    </div>
  </div>
</template>
<style scoped>
#Music {
  top: 24%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  height: 520px;
  width: 400px;
  background: #bbb6;
  backdrop-filter: blur(0.4rem);
  border-radius: 0.4rem;
  transition: all 0.56s ease;
  z-index: 100;
  color: var(--theme);
  display: flex;
  align-items: center;
  flex-direction: column;
}
#Music > div {
  display: flex;
  align-items: center;
}
#schedule {
  width: 240px;
  height: 4px;
  background: #fff;
  border-radius: 2px;
  position: relative;
  margin: 0 0.4rem;
}

.Music-controller :nth-child(1),
.Music-controller :nth-child(3) {
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-right: 16px solid #fff;
  border-left: none;
  width: 12px;
}
.Music-controller :nth-child(2)::before,
.Music-controller :nth-child(2)::after {
  content: "";
  display: block;
  position: absolute;
  height: v-bind("store.MusicPlaying?'28px':'0px'");
  width: v-bind("store.MusicPlaying?'6px':'0px'");
  background: v-bind("store.MusicPlaying?'#fff':'transparent'");
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  border-top: v-bind("store.MusicPlaying?'0px':'12px'") solid transparent;
  border-bottom: v-bind("store.MusicPlaying?'0px':'12px'") solid transparent;
  transition: all 0.12s ease;
  border-radius: v-bind("store.MusicPlaying?'4px':'0px'");
}
.Music-controller :nth-child(2)::before {
  border-left: v-bind("store.MusicPlaying?'0px':'18px'") solid #fff;
}
.Music-controller :nth-child(2)::after {
  left: 12px;
  border-left: v-bind("store.MusicPlaying?'0px':'transparent'") solid #fff;
}
.Music-controller :nth-child(3) {
  transform: rotate(180deg);
  position: relative;
}
.Music-controller :nth-child(1)::before,
.Music-controller :nth-child(3)::before {
  content: "";
  display: block;
  position: absolute;
  height: 28px;
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
  height: 24px;
  position: relative;
}
</style>
