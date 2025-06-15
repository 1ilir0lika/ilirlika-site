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

<style scoped>
.custom-layout {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}
</style>

