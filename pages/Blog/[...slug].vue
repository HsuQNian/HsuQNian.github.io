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
      <h1
        style="
          text-align: center;
          font-size: 2.4rem;
          font-weight: 600;
          margin-bottom: 0;
        "
      >
        {{ data.title }}
      </h1>
      <h5 style="text-align: center; font-size: 1rem; margin: 0">
        {{ data.time }}
      </h5>
      <ContentRenderer
        :value="data"
        class="markdown-body"
        style="
          flex: 1;
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 50vh;
        "
      >
        <template #empty>
          <div id="contentBox"></div>
        </template>
      </ContentRenderer>
      <Comment :width="'980px'" />
    </div>
  </div>
</template>
<style scoped>
@import url("../../public/github-markdown.css");
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}
#contentBox {
  height: 100vh;
  padding-top: 80px;
  width: 100vw;
  user-select: text;
}
#content {
  word-break: break-all;
  white-space: pre-wrap;
  line-height: 44px;
  transition: all 0.3s ease-in-out;
}
#content ::selection {
  background: var(--Virtual);
  opacity: 0.8;
}
</style>
