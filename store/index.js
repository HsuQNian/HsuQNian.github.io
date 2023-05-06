import { defineStore } from "pinia";
export const Store = defineStore("Main", {
  state: () => ({
    Music: null,
    MusicList: [],
    MusicListIndex: 0,
    MusicStore: false,
    MusicDisplay: false,
    MusicPlaying: false,
    MusicListShow: false,
    Log: "",
  }),
});
