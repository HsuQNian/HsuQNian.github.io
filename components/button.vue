<script setup>
const download = ref(null);
const app = defineProps({
  url: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <button class="download-button">
    <div class="docs">{{ app.text }}</div>
    <div class="download" @click="download.click()">
      <svg
        class="css-i6dzq1"
        stroke-linejoin="round"
        stroke-linecap="round"
        fill="none"
        stroke-width="2"
        stroke="currentColor"
        height="24"
        width="24"
        viewBox="0 0 24 24"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line y2="3" x2="12" y1="15" x1="12"></line>
      </svg>
    </div>
    <a ref="download" :href="app.url"></a>
  </button>
</template>
<style scoped>
.download-button {
  width: 120px;
  position: relative;
  border-width: 0;
  color: var(--Deep);
  font-size: 15px;
  font-weight: 600;
  border-radius: 4px;
  z-index: 1;
  padding: 0;
}

.download-button .docs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 40px;
  padding: 0 10px;
  border-radius: 4px;
  z-index: 1;
  background-color: var(--Real);
  transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}
.download {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 90%;
  margin: 0 auto;
  z-index: -1;
  border-radius: 4px;
  transform: translateY(0%);
  background-color: var(--theme);
  transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
  cursor: pointer;
}

.download-button:hover .download {
  transform: translateY(100%);
}

.download svg polyline,
.download svg line {
  animation: docs 1s infinite;
}

@keyframes docs {
  0% {
    transform: translateY(0%);
  }

  50% {
    transform: translateY(-15%);
  }

  100% {
    transform: translateY(0%);
  }
}
</style>
