<script setup>
const route = useRoute();
const { data } = await useAsyncData(
  "page-data",
  async () => await queryContent(`/blog/${route.params.slug[0]}`).findOne()
);
</script>
<template>
  <div id="contentBox">
    <div id="content">
      <h1 style="text-align: center; font-size: 2.4rem;font-weight: 600;">{{ data.title }}</h1>
      <span style="text-align: center;font-size: 1.4rem;">{{ data.time }}</span>
      <ContentRenderer
        :value="data"
        style="display: flex; flex-direction: column; width: 100%"
      >
        <template #empty>
          <p>还没写内容呢</p>
        </template>
      </ContentRenderer>
    </div>
  </div>
</template>
<style scoped>
#contentBox {
  padding: 80px 0;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  user-select: text;
  color: var(--Virtual);
}
#content {
  height: 84vh;
  width: 86vw;
  display: flex;
  word-break: keep-all;
  overflow: scroll;
  white-space: pre-wrap;
  flex-direction: column;
  line-height: 44px;
  transition: all 0.3s ease-in-out;
}
#content ::selection{
  background: var(--Virtual);
  opacity: 0.8;
}
</style>
