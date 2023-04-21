<script setup>
const blogPosts = (await queryContent("/blog").find()).reverse();
</script>
<template>
  <div id="BlogBox">
    <div id="Blog">
      <NuxtLink
        v-for="{ _path: slug, title, time } in blogPosts"
        :key="slug"
        :to="slug"
        :slug="slug"
      >
        <div id="title">
          <div>{{ title }}</div>
          <div style="font-size: 1rem">{{ time.split("T")[0] }}</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
<style scoped>
#BlogBox {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#Blog {
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
#title {
  letter-spacing: 4px;
  height: 40px;
}
a {
  margin: 1rem;
  font-size: 1.2rem;
  color: var(--Virtual);
  transition: all 0.3s ease-in-out;
}
a:hover {
  color: var(--Real);
}
</style>
