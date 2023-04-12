<template>
  <div
    style="
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    <div class="loader triangle">
      <svg viewBox="0 0 86 80">
        <polygon points="43 8 79 72 7 72"></polygon>
      </svg>
    </div>
  </div>
</template>
<style scoped>
.loader {
  --duration: 3s;
  width: 44px;
  height: 44px;
  position: relative;
  transform: scale(2);
}

.loader:before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  display: block;
  background: var(--theme);
  top: 37px;
  left: 19px;
  transform: translate(-18px, -18px);
  animation: themeRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
    infinite;
}

.loader svg {
  display: block;
  width: 100%;
  height: 100%;
}

.loader svg polygon {
  fill: none;
  stroke: var(--Real);
  stroke-width: 10px;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.loader svg polygon {
  stroke-dasharray: 145 76 145 76;
  stroke-dashoffset: 0;
  animation: RealTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
    infinite;
}

.loader.triangle {
  width: 48px;
}

.loader.triangle:before {
  left: 21px;
  transform: translate(-10px, -18px);
  animation: themeTriangle var(--duration)
    cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

@keyframes RealTriangle {
  33% {
    stroke-dashoffset: 74;
  }

  66% {
    stroke-dashoffset: 147;
  }

  100% {
    stroke-dashoffset: 221;
  }
}

@keyframes themeTriangle {
  33% {
    transform: translate(0, 0);
  }

  66% {
    transform: translate(10px, -18px);
  }

  100% {
    transform: translate(-10px, -18px);
  }
}

.loader {
  display: inline-block;
  margin: 0 16px;
}
</style>
