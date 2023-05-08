<script setup>
const route = useRoute();
const data = await queryContent(`/blog/${route.params.slug[0]}`).findOne();
const contentRenderer = ref(null);
onMounted(() => {
  let CodeBlock = contentRenderer.value.$el.querySelectorAll("pre");
  CodeBlock.forEach((item) => {
    let lineNumber = parseInt(
      item.querySelector("code span.line:last-child").getAttribute("line")
    );
    const line = document.createElement("code");
    line.className = "line-number";
    for (let i = 1; i <= lineNumber; i++) {
      const span = document.createElement("span");
      span.innerText = i;
      line.appendChild(span);
    }
    item.prepend(line);
  });
});
// useHead({
//   script: [
//     {
//       type: "text/javascript",
//       src: "https://cdn.bootcss.com/mathjax/3.0.5/es5/tex-mml-chtml.js",
//       id: "MathJax-script",
//       async: true,
//     },
//   ],
// });
</script>
<template>
  <div id="contentBox">
    <div id="content">
      <h2
        style="
          text-align: center;
          font-weight: 600;
          margin-bottom: 0;
          line-height: 1.6rem;
        "
      >
        {{ data.title }}
      </h2>
      <p style="text-align: center; margin-bottom: -12px; font-size: 0.8rem">
        {{ data.date }}
      </p>
      <ContentRenderer
        :value="data"
        ref="contentRenderer"
        class="markdown-body"
      >
        <template #empty>
          <div id="contentBox" />
        </template>
      </ContentRenderer>
      <Comment v-if="data.comment" :width="'980px'" />
    </div>
  </div>
</template>

<style scoped>
.markdown-body {
  min-width: 160px;
  max-width: 980px;
  margin: 0 auto;
  padding: 0 30px;
  border: 20px solid var(--Deep);
  background: var(--Deep);
  display: flex;
  flex-direction: column;
  min-height: 50vh;
}
#contentBox {
  height: 100vh;
  padding-top: 80px;
  width: 100vw;
  user-select: text;
}
#content {
  white-space: pre-wrap;
  transition: all 0.3s ease-in-out;
}
#content:not(.markdown-body) {
  color: var(--Virtual);
}
#content:not(.markdown-body) h2 {
  width: 72vw;
  margin: auto;
}
:not(.markdown-body)::selection {
  background: var(--Virtual);
  color: var(--theme);
  opacity: 0.8;
}
.markdown-body ::selection {
  background: var(--Virtual);
  opacity: 0.8;
}
</style>
<style>
@import url("@/public/github-markdown.css");
</style>
