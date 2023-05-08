import { defineStore } from "pinia";
const MusicList = [
  "Kevin Penkin - Erosion",
  "Kevin Penkin - Moving Out",
  "Kevin Penkin - Music",
  "October - Time To Love",
  "TD - みゆな-缶ビール（退独 remix）",
  "α·Pav - μ¹",
  "ふぁがじー - いかないで piano.ver",
  "阿鲲 - 550W ／ Moss",
  "阿鲲 - 单程票",
  "麦吉_Maggie - 朗朗晴天／ハレハレヤ（翻自 v flower）",
  "麦吉_Maggie - 桜+OK绷（中日双声道）（翻自 FUNKY MONKEY BABYS）",
  "銘晴Halo - I Really Want to Stay At Your House（完整版·粤语复古）",
  "善喜 - 戒不掉的想你",
  "早凉 - 大摆（cover 大喜）",
].sort(() => Math.random() - 0.5);
export const Store = defineStore("Main", {
  state: () => ({
    Music: new Audio(`./Medium/Music/${MusicList[0]}.mp3`),
    MusicList: MusicList,
    MusicListIndex: 0,
    MusicStore: false,
    MusicDisplay: false,
    MusicPlaying: false,
    MusicListShow: false,
    log: "",
  }),
});
