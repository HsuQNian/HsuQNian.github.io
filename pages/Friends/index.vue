<script setup>
const { data } = await useAsyncData("page-data", () =>
  queryContent(`/friends`).findOne()
);
</script>
<template>
  <div id="contentBox">
    <div style="padding-top: 64px; text-align: center">
      加入友链请在下方留言(随机顺序不分先后)
    </div>
    <div id="friends">
      <FriendCard
        id="FriendCard"
        v-for="friends in data.friends.sort(
          () => Math.random().toFixed(1) - 0.5
        )"
        :key="friends.title"
        :link="friends.link"
        :name="friends.name"
        :descr="friends.descr"
        :avatar="friends.avatar"
      />
    </div>
    <Comment :width="'100%'" />
  </div>
</template>
<style scoped>
#contentBox {
  height: 100vh;
  width: 100vw;
  user-select: text;
  color: var(--Virtual);
}
#friends {
  margin-top: 28px;
  transition: all 0.64s cubic-bezier(0.18, 0.89, 0.32, 1.12);
  align-items: flex-start;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  min-height: 40vh;
  margin: auto;
  width: 70vw;
}
@media screen and (max-width: 1780px) {
  #friends {
    width: 88vw;
  }
}
@media screen and (max-width: 1440px) {
  #friends {
    grid-template-columns: repeat(3, 1fr);
    width: 74vw;
  }
}

@media screen and (max-width: 1270px) {
  #friends {
    width: 94vw;
  }
}
@media screen and (max-width: 1020px) {
  #friends {
    width: 100vw;
  }
}
@media screen and (max-width: 970px) {
  #friends {
    grid-template-columns: repeat(2, 1fr);
    min-height: 60vh;
    width: 72vw;
    align-items: center;
  }
}
@media screen and (max-width: 880px) and (min-width: 700px) {
  #friends {
    width: 94vw;
  }
}
@media screen and (max-width: 700px) {
  #friends {
    grid-template-columns: repeat(1, 1fr);
    align-items: center;
    width: 100vw;
  }
}
</style>
