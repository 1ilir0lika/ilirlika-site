<script setup lang="ts">
import { onMounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!

  type ShapeType = 'circle' | 'square' | 'triangle'

  interface Shape {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    type: ShapeType
  }

  const shapeCount = 16
  const shapes: Shape[] = []
  const shapeTypes: ShapeType[] = ['circle', 'square', 'triangle']

  const resizeCanvas = () => {
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  for (let i = 0; i < shapeCount; i++) {
    shapes.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      size: 50,
      type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)]
    })
  }

  const applyRepulsion = (s: Shape, others: Shape[]) => {
    for (const other of others) {
      if (s === other) return

      let dx = s.x - other.x
      let dy = s.y - other.y

      if (Math.abs(dx) > window.innerWidth / 2) dx -= Math.sign(dx) * window.innerWidth
      if (Math.abs(dy) > window.innerHeight / 2) dy -= Math.sign(dy) * window.innerHeight

      const dist = Math.hypot(dx, dy)
      if (dist > 0 && dist < 60) {
        const force = (60 - dist) / 60 * 0.1
        s.vx += (dx / dist) * force
        s.vy += (dy / dist) * force
      }
    }
  }

  const drawShape = (s: Shape) => {
    ctx.beginPath()
    switch (s.type) {
      case 'circle':
        ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2)
        break
      case 'square':
        ctx.rect(s.x - s.size / 2, s.y - s.size / 2, s.size, s.size)
        break
      case 'triangle':
        const h = (Math.sqrt(3) / 2) * s.size
        ctx.moveTo(s.x, s.y - h / 2)
        ctx.lineTo(s.x - s.size / 2, s.y + h / 2)
        ctx.lineTo(s.x + s.size / 2, s.y + h / 2)
        ctx.closePath()
        break
    }
    ctx.fillStyle = '#444'
    ctx.fill()
  }

  const animate = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    // Update shape physics
    for (const s of shapes) {
      applyRepulsion(s, shapes)

      s.x += s.vx
      s.y += s.vy

      if (s.x > window.innerWidth) s.x = 0
      if (s.x < 0) s.x = window.innerWidth
      if (s.y > window.innerHeight) s.y = 0
      if (s.y < 0) s.y = window.innerHeight
    }

    // Draw shapes with blending only at intersection
    ctx.globalCompositeOperation = 'lighter'
    for (const s of shapes) drawShape(s)

    requestAnimationFrame(animate)
  }

  animate()
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="h-screen relative overflow-hidden">
      <canvas ref="canvasRef" class="absolute top-0 left-0 w-full h-full z-0"></canvas>

      <!-- Shared hover group for title + arrow -->
      <div class="relative z-10 w-full h-full group pointer-events-none">

        <!-- Centered Title (clickable) -->
        <a href="#next-section" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer">
          <h2 class="text-4xl font-bold text-black transition duration-300 group-hover:text-gray-300">
            Ilir Lika
          </h2>
        </a>

        <!-- Bottom Arrow -->
        <a href="#next-section" class="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto">
          <svg xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="w-6 h-6 text-black transition duration-300 group-hover:text-gray-300 animate-bounce">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg>
        </a>

      </div>
    </section>

    <!-- Quote + Shapes Section -->
    <section id="next-section" class="h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <!-- Quote box -->
      <div class="bg-white shadow-lg rounded-xl p-8 max-w-2xl text-center border border-gray-200">
        <p class="text-xl italic text-gray-800 leading-relaxed">
          "The universe is written in the language of mathematics, and its characters are triangles, circles, and other geometric figures. Without understanding this language, it is impossible to comprehend a single word of it."
        </p>
        <p class="mt-4 text-gray-700 font-semibold not-italic">— Galileo Galilei</p>
      </div>

<!-- Shapes row -->
<div class="flex justify-center space-x-16 mt-12">
  <!-- Triangle -->
  <div class="flex flex-col items-center" style="height: 96px; justify-content: flex-end;">
    <div
      class="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[72px]"
      style="border-bottom-color: #444;"
    ></div>
    <p class="mt-2 text-gray-700 font-semibold">Who am I?</p>
  </div>
  <!-- Circle -->
  <div class="flex flex-col items-center" style="height: 96px; justify-content: flex-end;">
    <div class="w-16 h-16 rounded-full" style="background-color: #444;"></div>
    <p class="mt-2 text-gray-700 font-semibold">Projects</p>
  </div>
  <!-- Square -->
  <div class="flex flex-col items-center" style="height: 96px; justify-content: flex-end;">
    <div class="w-16 h-16" style="background-color: #444;"></div>
    <p class="mt-2 text-gray-700 font-semibold">Blog</p>
  </div>
</div>



    </section>
  </div>
</template>


<style scoped>
html {
  scroll-behavior: smooth;
}
canvas {
  display: block;
}
</style>
