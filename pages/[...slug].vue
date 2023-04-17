<script setup></script>
<template>
  <div id="error">
    <ContentDoc>
      <template #not-found>
        <div
          style="
            background-image: linear-gradient(
              45deg,
              var(--theme) 30%,
              #33c4df 84%
            );
            -webkit-background-clip: text;
          "
        >
          <h1>这里没有你想要的</h1>
        </div>
      </template>
    </ContentDoc>
  </div>
</template>
<style scoped>
#error {
  color: var(--Virtual);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
h1 {
  font-size: 8rem !important;
  color: transparent;
  transition: all 0.64s cubic-bezier(0.18, 0.89, 0.32, 1.12);
}
@media screen and (max-width: 1200px) {
  h1 {
    font-size: 4rem !important;
  }
}
@media screen and (max-width: 800px) {
  h1 {
    font-size: 2rem !important;
  }
}
</style>
