<script setup>
const test = ref(null);
onMounted(() => {});
const childNum = ref(0);
const add = () => {
  const div = document.createElement("div");
  div.innerHTML = "a";
  div.classList.add("child");
  test.value?.appendChild(div);
  childNum.value++;
};
</script>
<template>
  <div id="test">
    {{ childNum }}
    <button @click="add">add</button>
  </div>
</template>
<style scoped>
#test {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>

<style>
.child {
  width: 200px;
  height: 200px;
  background-color: red;
  margin: 10px;
}
</style>
