<script setup>
const { data } = await useAsyncData(
  "page-data",
  async () => await queryContent(`/friend`).findOne()
);
</script>
<template>
  <div id="contentBox">
    <div id="friend">
      <FriendCard
        v-for="friend in data.friend"
        :key="friend.title"
        :link="friend.link"
        :name="friend.name"
        :descr="friend.descr"
        :avatar="friend.avatar"
      />
    </div>
  </div>
</template>
<style scoped>
#contentBox {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  user-select: text;
  color: var(--Virtual);
}
#friend {
  transition: all 0.64s cubic-bezier(0.18, 0.89, 0.32, 1.12);
  align-items: flex-start;
  margin: 0 0 auto 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 80px 0;
  justify-items: center;
}
@media screen and (max-width: 1340px) {
  #friend {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 1020px) {
  #friend {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 670px) {
  #friend {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
