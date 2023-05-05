<script setup>
const blogPosts = ref((await queryContent("/blog").find()).reverse());
const tags = reactive(["全部"]);
const blogList = ref([]);
const selectTag = async (params) => {
  blogPosts.value = (await queryContent("/blog").find()).reverse();
  if (params == "全部") blogList.value = blogPosts.value;
  else {
    blogList.value = blogPosts.value.filter((post) => {
      if (typeof post.label == "string") return post.label == params;
      else return post.label.includes(params);
    });
  }
};
onMounted(() => {
  blogPosts.value.forEach((post) => {
    if (typeof post.label == "string" && tags.indexOf(post.label) == -1)
      tags.push(post.label);
    else if (tags.indexOf(post.label) > -1) return;
    else {
      post.label.forEach((tag) => {
        if (!tags.includes(tag) && tags.indexOf(tag) == -1) tags.push(tag);
      });
    }
  });
  blogList.value = blogPosts.value;
});
</script>
<template>
  <div id="BlogBox">
    <div id="tags">
      <span v-for="index in tags" @click="selectTag(index)">{{ index }}</span>
    </div>
    <div id="Blog">
      <transition-group name="blogPosts">
        <NuxtLink
          v-for="{ _path: slug, title, date, label } in blogList"
          :key="slug"
          :to="slug"
          :slug="slug"
        >
          <div id="title">
            <div>{{ title }}</div>
            <div style="font-size: 0.76rem; letter-spacing: 2px">
              <span>{{ date.split("T")[0] }}</span>
              <span
                v-if="typeof label != 'string'"
                v-for="index in label"
                class="label"
                >{{ index }}</span
              >
              <span v-else class="label">{{ label }}</span>
            </div>
          </div>
        </NuxtLink>
      </transition-group>
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
#tags {
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 1rem;
  color: var(--Virtual);
  flex-wrap: wrap;
}
#tags span {
  font-size: 0.8rem;
  transition: all 0.32s ease-in-out;
  cursor: pointer;
}
#tags span:not(:first-child) {
  margin-left: 1rem;
}
#tags span:hover {
  color: var(--Real);
}
#Blog {
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
#Blog span:nth-child(2) {
  margin-left: 20px;
}
#title {
  letter-spacing: 2px;
  height: 40px;
}
.label:first {
  padding-left: 20px;
}

.label + .label::before {
  content: "·";
}

a {
  margin: 1.2rem -1rem;
  font-size: 1rem;
  color: var(--Virtual);
  transition: all 0.32s ease-in-out;
  position: relative;
}
a:nth-child(1) {
  /* margin-top: 0; */
}
a:hover {
  color: var(--Real);
}
a::before {
  position: absolute;
  content: "";
  height: 1px;
  background: var(--Virtual);
  width: 94%;
  bottom: -0.8rem;
}
</style>
