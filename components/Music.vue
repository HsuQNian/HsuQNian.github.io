<script setup>
import { Store } from "../store/index.js";
const currentTime = ref("00:00");
const duration = ref("00:00");
const store = Store();
const circulate = ref(false);
const Progress = ref(null);
const Lyric = ref(null);
const timeLine = ref([]);
const characters = ref([]);
const origin = location.origin;
const MusicList = (await (await fetch(`${origin}/api/MusicList`)).json()).sort(
  () => Math.random() - 0.5
);
const lyric = (lrc) => {
  timeLine.value = [];
  lrc.match(/(?=\[).*?(?<=\])/g).forEach((item, index) => {
    let timeStr = /(\d{2}):(\d{2})(\.(\d{2,3}))?/.exec(item);
    let min = parseInt(timeStr[1]);
    let sec = parseInt(timeStr[2]);
    let msec = parseInt(timeStr[4]);
    let time = min * 60 + sec + msec / 1000;
    timeLine.value.push(time);
  });
  characters.value = lrc.replace(/(?=\[).*?(?<=\])/g, "").split("\n");
  Lyric.value.innerHTML = "";
  characters.value.forEach((element) => {
    let p = document.createElement("p");
    p.innerHTML = element;
    Lyric.value.appendChild(p);
  });
};
const delay = (time, ...param) => {
  setTimeout(() => {
    eval(param.length > 1 ? `${param[0]}=${param[1]}` : `${param}`);
    setTimeout(() => {
      store.Music.play();
    }, 480);
  }, time);
};
store.MusicList = MusicList;
store.Music = new Audio(`${origin}/Medium/Music/${MusicList[0]}.mp3`);
const FirstPlay = watch(
  () => store.MusicDisplay,
  async () => {
    lyric(
      await (await fetch(`${origin}/Medium/lyric/${MusicList[0]}.lrc`)).text()
    );
    FirstPlay();
  }
);

store.Music.preload = "none";
const schedule = () => {
  store.Music.currentTime = store.Music.duration * (event.offsetX / 300);
};
store.Music.onplay = () => {
  store.MusicPlaying = true;
};
store.Music.onpause = () => {
  store.MusicPlaying = false;
};
store.Music.onplaying = () => {
  store.MusicPlaying = true;
};
store.Music.oncanplay = () => {
  store.MusicCanPlay = true;
  if (store.MusicWantToPlay) {
    store.Music.play();
    store.MusicWantToPlay = false;
  }
};
store.Music.onended = async () => {
  store.MusicCanPlay = false;
  store.MusicPlaying = false;
  Progress.value.style.width = "0%";
  if (circulate.value) store.Music.play();
  else {
    store.MusicSwitch = true;
    store.MusicListIndex =
      store.MusicListIndex != store.MusicList.length - 1
        ? ++store.MusicListIndex
        : 0;
    store.Music.src = `${origin}/Medium/Music/${
      store.MusicList[store.MusicListIndex]
    }.mp3`;
    delay(480, "store.MusicSwitch", false);
  }
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
  timeLine.value.forEach((item, index) => {
    if (
      store.Music.currentTime >= item &&
      (!timeLine.value[index + 1] ||
        store.Music.currentTime < timeLine.value[index + 1])
    ) {
      Lyric.value.style.transform = `translateY(-${index * 24}px)`;
      return;
    }
  });
};
watch(
  () => store.MusicListIndex,
  async () => {
    lyric(
      await (
        await fetch(
          `${origin}/Medium/lyric/${MusicList[store.MusicListIndex]}.lrc`
        )
      ).text()
    );
  }
);
</script>
<template>
  <div
    id="Music"
    :style="{
      transform: store.MusicDisplay
        ? 'translate(-50%, 10%) '
        : 'translate(-50%, -240%) ',
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
        {{ store.MusicList[store.MusicListIndex] }}
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          flex: 1;
          width: 60%;
        "
      >
        <button
          @click="
            () => {
              store.Music.pause();
              store.MusicSwitch = true;
              store.MusicCanPlay = false;
              store.MusicPlaying = false;
              Progress.style.width = '0%';
              store.MusicListIndex =
                store.MusicListIndex != 0
                  ? --store.MusicListIndex
                  : store.MusicList.length - 1;
              store.Music.src = `${origin}/Medium/Music/${
                store.MusicList[store.MusicListIndex]
              }.mp3`;
              delay(480, 'store.MusicSwitch', false);
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
              store.Music.pause();
              store.MusicSwitch = true;
              store.MusicCanPlay = false;
              store.MusicPlaying = false;
              Progress.style.width = '0%';
              store.MusicListIndex =
                store.MusicListIndex != store.MusicList.length - 1
                  ? ++store.MusicListIndex
                  : 0;
              store.Music.src = `${origin}/Medium/Music/${
                store.MusicList[store.MusicListIndex]
              }.mp3`;
              delay(480, 'store.MusicSwitch', false);
            }
          "
        />
        <button @click="circulate = !circulate">
          <div
            :style="{
              transform: circulate
                ? 'rotate(45deg) translate(80%, -80%)'
                : 'rotate(45deg)',
            }"
          />
          <div
            style="
              font-size: 0.4rem;
              color: #fff;
              transition: all 0.4s ease;
              transform: translateX(-40%);
            "
            :style="{ opacity: circulate ? '1' : '0' }"
          >
            1
          </div>
          <div />
        </button>
        <button @click="store.MusicListShow = !store.MusicListShow">
          <div />
        </button>
      </div>
    </div>
    <div style="flex: 1; font-size: 0.6rem">
      <div id="schedule" @click="schedule">
        <div
          ref="Progress"
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
      <div>{{ currentTime }}</div>
      <div>&nbsp;/&nbsp;</div>
      <div>{{ duration }}</div>
    </div>
  </div>
  <div
    id="LyricWindow"
    :style="{
      opacity: store.Music != '' && store.MusicPlaying ? 1 : 0,
      filter: store.Music != '' && store.MusicPlaying ? 'none' : 'blur(1rem)',
    }"
  >
    <div
      id="Lyric"
      ref="Lyric"
      style="transition: all 0.4s ease-out; color: var(--Real)"
    />
  </div>
  <div
    id="MusicList"
    style="overflow-y: scroll; height: 114px"
    :style="{
      transform: store.MusicListShow
        ? 'translate(-50%,-64%)'
        : 'translate(-50%,-360%)',
      opacity: store.MusicListShow ? 1 : 0,
    }"
  >
    <div
      v-for="index in store.MusicList"
      @click="
        () => {
          if (store.MusicListIndex != store.MusicList.indexOf(index)) {
            store.Music.pause();
            store.MusicSwitch = true;
            store.MusicCanPlay = false;
            store.MusicPlaying = false;
            Progress.style.width = '0%';
            store.Music.src = `${origin}/Medium/Music/${index}.mp3`;
            store.MusicListIndex = store.MusicList.indexOf(index);
            delay(480, 'store.MusicSwitch', false);
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
          transition: all 0.56s ease;
        "
        :style="{
          background:
            store.MusicListIndex == store.MusicList.indexOf(index)
              ? 'var(--theme)'
              : 'transparent',
        }"
      />
      <div
        style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis"
      >
        {{ index }}
      </div>
    </div>
  </div>
</template>
<style scoped>
#Music {
  top: 88px;
  left: 50%;
  position: fixed;
  height: 80px;
  width: 400px;
  background: #fff2;
  backdrop-filter: blur(8px);
  border-radius: 0.4rem;
  transition: all 0.56s cubic-bezier(0.18, 0.89, 0.32, 1.12);
  z-index: 1001;
  color: var(--theme);
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 0 0.1rem var(--Virtual) inset;
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
  margin: 0 0.4rem 0 0.6rem;
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
  height: 12px;
  border: 2px solid #fff;
  position: relative;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
}
button:nth-child(4) > div:not(:nth-child(2)) {
  width: 4px;
  height: 4px;
  position: absolute;
  border: 2px solid #fff;
  border-radius: 2px;
  transition: all 0.4s ease;
}
button:nth-child(4) > div:nth-child(1) {
  top: -5.4px;
  left: -2.4px;
  border-bottom: 2px solid transparent;
  border-left: 2px solid transparent;
}
button:nth-child(4) > div:nth-child(3) {
  bottom: -5.4px;
  right: -2.4px;
  border-top: 2px solid transparent;
  border-right: 2px solid transparent;
  opacity: v-bind("circulate?'0':'1'");
  transform: rotate(45deg);
}
button:last-child {
  transform: rotate(90deg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
button:last-child > div {
  height: 14px;
  width: 2px;
  background: #fff;
}
button:last-child::after {
  position: absolute;
  left: 0 !important;
}
button:nth-child(1)::before,
button:nth-child(3)::before,
button:last-child::before,
button:last-child::after {
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
  outline: none;
}
#LyricWindow {
  display: block;
  position: fixed;
  transition: all 0.28s;
  width: 360px;
  overflow: hidden;
  font-size: 0.8rem;
  bottom: 28px;
  right: 50%;
  transform: translateX(50%);
  height: 24px;
  pointer-events: none;
  z-index: 1001;
}
#MusicList {
  position: fixed;
  top: 266px;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  width: 400px;
  font-size: 0.8rem;
  background: #fff2;
  backdrop-filter: blur(8px);
  border-radius: 0.4rem;
  opacity: 1;
  transition: all 0.56s cubic-bezier(0.18, 0.89, 0.32, 1.12);
  z-index: 100;
  box-shadow: 0 0 0.1rem var(--theme);
}
#MusicList::-webkit-scrollbar {
  display: block;
  width: 2px;
  height: 4px;
}
#MusicList::-webkit-scrollbar-thumb {
  background: var(--theme);
}
#MusicList > div {
  padding: 2px 8px;
  display: flex;
  align-items: center;
  transition: all 0.36s ease;
}
#MusicList > div:hover {
  background: #fff8;
  color: var(--theme);
}
</style>
<style>
#Lyric > p {
  font-size: 0.8rem;
  text-align: center;
  color: var(--Real);
  margin: 0;
}
</style>
