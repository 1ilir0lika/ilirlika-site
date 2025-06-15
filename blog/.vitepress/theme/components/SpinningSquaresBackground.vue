<template>
  <canvas ref="canvas" class="bg-canvas"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const canvas = ref(null)

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  let w = canvas.value.width = window.innerWidth
  let h = canvas.value.height = window.innerHeight

  let squares = []

  function generateSquares() {
    const area = w * h
    const densityFactor = 75000
    const count = Math.floor(area / densityFactor)

    squares = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 20 + Math.random() * 50, // tra 20 e 70 px
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: 0.003 + Math.random() * 0.01,
    }))
  }

  function draw() {
    ctx.clearRect(0, 0, w, h)

    for (const s of squares) {
      s.angle += s.rotationSpeed

      ctx.save()
      ctx.translate(s.x, s.y)
      ctx.rotate(s.angle)

      ctx.fillStyle = 'rgba(128, 128, 128, 0.35)'
      ctx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size)

      ctx.restore()
    }

    requestAnimationFrame(draw)
  }

  generateSquares()
  draw()

  window.addEventListener('resize', () => {
    w = canvas.value.width = window.innerWidth
    h = canvas.value.height = window.innerHeight
    generateSquares()
  })
})
</script>

<style scoped>
.bg-canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
}
</style>

