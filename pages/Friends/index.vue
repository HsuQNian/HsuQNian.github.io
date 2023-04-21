<script setup>
const { data } = await useAsyncData(
  "page-data",
  async () => await queryContent(`/friends`).findOne()
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
        v-for="friends in data.friends.sort(() => {
          return Math.random().toFixed(1) - 0.5;
        })"
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
#FriendCard {
  margin: 20px;
}
#friends {
  margin-top: 28px;
  transition: all 0.64s cubic-bezier(0.18, 0.89, 0.32, 1.12);
  align-items: flex-start;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  min-height: 50vh;
  margin: auto;
}
@media screen and (max-width: 1340px) {
  #friends {
    grid-template-columns: repeat(3, 1fr);
    width: 94vw;
  }
}
@media screen and (max-width: 1020px) {
  #friends {
    grid-template-columns: repeat(2, 1fr);
    min-height: 40vh;
    width: 100vw;
    align-items: center;
  }
}
@media screen and (max-width: 640px) {
  #friends {
    grid-template-columns: repeat(1, 1fr);
    min-height: 80vh;
    align-items: center;
  }
  #FriendCard {
    margin: 0;
  }
}
</style>
