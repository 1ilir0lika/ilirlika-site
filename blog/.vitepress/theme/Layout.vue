<template>
  <div class="custom-layout">
    <SpinningSquaresBackground />
    <Layout />
  </div>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import SpinningSquaresBackground from './components/SpinningSquaresBackground.vue'

const { Layout } = DefaultTheme
</script>

<style>
.custom-layout {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* Hide the actual curtain you found */
.aside-curtain {
  background-color: transparent !important;
  pointer-events: none !important;
  opacity: 0 !important;
}
</style>
