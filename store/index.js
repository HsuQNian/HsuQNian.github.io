import { defineStore } from "pinia";

export const Store = defineStore("Main", {
  state: () => ({
    Music: "",
    MusicList: [],
    MusicListIndex: 0,
    MusicSwitch: false,
    MusicCanPlay: false,
    MusicDisplay: false,
    MusicPlaying: false,
    MusicListShow: false,
    MusicWantToPlay: false,
    log: "",
  }),
});
