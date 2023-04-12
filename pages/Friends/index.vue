<script setup>
const { data } = await useAsyncData(
  "page-data",
  async () => await queryContent(`/friends`).findOne()
);
</script>
<template>
  <div id="contentBox">
    <div style="padding-top: 80px; text-align: center">
      如果你想要加入友链，请在下方留言
    </div>
    <div id="friends">
      <FriendCard
        v-for="friends in data.friends"
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
  margin-top: 20px;
  transition: all 0.64s cubic-bezier(0.18, 0.89, 0.32, 1.12);
  align-items: flex-start;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  min-height: 50vh;
  flex-direction: column;
}
@media screen and (max-width: 1340px) {
  #friends {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 1020px) {
  #friends {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 670px) {
  #friends {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
