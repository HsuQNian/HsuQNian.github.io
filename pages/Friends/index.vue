<script setup>
const { data } = await useAsyncData(
  "page-data",
  async () => await queryContent(`/friends`).findOne()
);
</script>
<template>
  <div id="contentBox">
    <div id="friends">
      <FriendCard
        v-for="friends in data.friend"
        :key="friends.title"
        :link="friends.link"
        :name="friends.name"
        :descr="friends.descr"
        :avatar="friends.avatar"
      />
    </div>
    <Comment />
  </div>
</template>
<style scoped>
#contentBox {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: text;
  color: var(--Virtual);
}
#friends {
  transition: all 0.64s cubic-bezier(0.18, 0.89, 0.32, 1.12);
  align-items: flex-start;
  margin: 0 0 auto 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 80px 0;
  justify-items: center;
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
